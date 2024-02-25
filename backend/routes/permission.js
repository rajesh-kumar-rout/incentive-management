import { Router } from "express"
import { fetchAll } from "../utils/db.js"

const router = Router()

router.get("/", async (req, res) => {
    const { employeeId } = req.local 

    const employees = await fetchAll(`SELECT id, name, email, is_admin, is_active FROM employees WHERE id <> ${employeeId}`)

    res.json(employees)
})

export default router