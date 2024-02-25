import { Router } from "express"
import { fetch, fetchAll, insert, query } from "../utils/db.js"

const router = Router()

router.get("/", async (req, res) => {
    let holidays = await fetchAll("SELECT * FROM holiday_packages")

    const holidayIds = holidays.map(holiday => holiday.id).join(",").toString()

    const amenities = await fetchAll(`SELECT * FROM amenities WHERE holidayPackageId IN (${holidayIds})`)

    holidays = holidays.map(holiday => ({
        ...holiday,
        amenities: amenities.filter(amenity => amenity.holidayPackageId === holiday.id).map(amenity => amenity.name)
    }))

    res.json(holidays)
})

router.get("/:id", async (req, res) => {
    const { id } = req.params

    const holiday = await fetch("SELECT * FROM holiday_packages WHERE id = :id", { id })

    if (holiday) {
        const amenities = await fetchAll("SELECT * FROM amenities WHERE holidayPackageId = :id", { id: holiday.id })
        holiday.amenities = amenities.map(amenity => amenity.name)
    }

    res.json(holiday)
})

router.post("/", async (req, res) => {
    const { name, duration, destination, location, amenities } = req.body

    const holidayPackage = await fetch("SELECT 1 FROM holiday_packages WHERE name = :name LIMIT 1", { name })

    if (holidayPackage) {
        return res.status(409).json({ message: "Holiday package already exists" })
    }

    const packageId = await insert("INSERT INTO holiday_packages (name, duration, destination, location) VALUES (:name, :duration, :destination, :location)", {
        name,
        duration,
        destination,
        location
    })

    for (const amenity of amenities) {
        await insert("INSERT INTO amenities (name, holidayPackageId) VALUES (:amenity, :packageId)", {
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

    await query("DELETE FROM amenities WHERE holidayPackageId = :id", { id })

    for (const amenity of amenities) {
        await insert("INSERT INTO amenities (name, holidayPackageId) VALUES (:amenity, :id)", {
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