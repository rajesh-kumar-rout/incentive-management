import { Router } from "express"
import { insert, query, fetch } from "../utils/db.js"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { authenticate } from "../middlewares/auth.js"

const router = Router()

router.get("/", authenticate, async (req, res) => {
    const { employeeId } = req.local

    const employee = await fetch("SELECT id, name, email, is_admin FROM employees WHERE id = :employeeId LIMIT 1", { employeeId })

    res.json(employee)
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    const employee = await fetch("SELECT * FROM employees WHERE email = :email LIMIT 1", { email })

    if (!(employee && await bcrypt.compare(password, employee.password))) {
        return res.status(422).json({ message: "Invalid email or password" })
    }

    const token = crypto.randomBytes(32).toString('hex')

    await insert("INSERT INTO auth_tokens (employee_id, token) VALUES (:employeeId, :token)", {
        employeeId: employee.id,
        token
    })

    res.json({ token })
})

router.delete("/logout", authenticate, async (req, res) => {
    const { authorization } = req.headers

    const token = authorization?.slice(7, authorization?.length) ?? null

    await query("DELETE FROM auth_tokens WHERE token = :token", { token })

    res.json({ message: "Logout successfully" })
})

router.patch("/password", authenticate, async (req, res) => {
    const { employeeId } = req.local

    const { oldPassword, newPassword } = req.body

    const employee = await fetch("SELECT * FROM employees WHERE id = :employeeId", { employeeId })

    if (!await bcrypt.compare(oldPassword, employee.password)) {
        return res.status(422).json({ message: "Old password does not match" })
    }

    await query("UPDATE employees SET password = :password WHERE id = :employeeId", {
        password: await bcrypt.hash(newPassword, 10),
        employeeId
    })

    res.json({ message: "Password changed successfully" })
})

router.patch("/", authenticate, async (req, res) => {
    const { employeeId } = req.local

    const { name } = req.body

    await query("UPDATE employees SET name = :name WHERE id = :employeeId", {
        name,
        employeeId
    })

    res.json({ message: "Account edited successfully" })
})

export default router