import { Router } from "express"
import { fetchAll, insert, query, fetch } from "../utils/db.js"

const router = Router()

router.get("/", async (req, res) => {
    let holidays = await fetchAll("SELECT * FROM holiday_packages")

    const holidayIds = holidays.map(holiday => holiday.id).join(",").toString()

    const amenities = await fetchAll(`SELECT * FROM amenities WHERE holiday_package_id IN (${holidayIds})`)

    holidays = holidays.map(holiday => ({
        ...holiday,
        amenities: amenities.filter(amenity => amenity.holiday_package_id === holiday.id)
    }))

    res.json(holidays)
})

router.get("/:id", async (req, res) => {
    const { id } = req.params

    const holiday = await fetch("SELECT * FROM holiday_packages WHERE id = :id", { id })

    if (holiday) {
        holiday.amenities = await fetchAll("SELECT * FROM amenities WHERE holiday_package_id = :id", { id: holiday.id })
    }

    res.json(holiday)
})

router.post("/", async (req, res) => {
    const { name, duration, destination, location, amenities } = req.body

    const packageId = await insert("INSERT INTO holiday_packages (name, duration, destination, location) VALUES (:name, :duration, :destination, :location)", {
        name,
        duration,
        destination,
        location
    })

    for (const amenity of amenities) {
        await insert("INSERT INTO amenities (name, holiday_package_id) VALUES (:amenity, :packageId)", {
            amenity,
            packageId
        })
    }

    res.status(201).json({ message: "Holiday package added successfully" })
})

router.patch("/:id", async (req, res) => {
    const { id } = req.params

    const { name, duration, destination, location, amenities } = req.body

    await insert("UPDATE holiday_packages SET name = :name, duration = :duration, destination = :destination, location = :location WHERE id = :id", {
        id,
        name,
        duration,
        destination,
        location
    })

    await query("DELETE FROM amenities WHERE holiday_package_id = :id", { id })

    for (const amenity of amenities) {
        await insert("INSERT INTO amenities (name, holiday_package_id) VALUES (:amenity, :id)", {
            amenity,
            id
        })
    }

    res.json({ message: "Holiday package updated successfully" })
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    await query("DELETE FROM holiday_packages WHERE id = :id", { id })

    res.json({ message: "Holiday package deleted successfully" })
})

export default router