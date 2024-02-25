import { Router } from "express"
import { fetchAll } from "../utils/db.js"

const router = Router()

router.get("/", async (req, res) => {
    const employeeId = req.employee.id

    const incentives = await fetchAll(`SELECT incentives.*, holiday_packages.name AS holidayPackage FROM incentives INNER JOIN holiday_packages ON holiday_packages.id = incentives.holidayPackageId WHERE employeeId = ${employeeId} ORDER BY incentives.id DESC`)

    res.json(incentives)
})

export default router