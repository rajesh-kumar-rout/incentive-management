import { fetch } from "../utils/db.js"

export const authenticate = async (req, res, next) => {
    const { authorization } = req.headers

    const token = authorization?.slice(7, authorization?.length) ?? null

    const authToken = await fetch("SELECT * FROM auth_tokens WHERE token = :token", { token })

    if (!authToken) {
        return res.status(401).json({ message: "Unauthenticated" })
    }

    req.local = { employeeId: authToken.employee_id }

    next()
}

export const isAdmin = async (req, res, next) => {
    const { employeeId } = req.local

    const employee = await fetch("SELECT 1 FROM employees WHERE id = :employeeId AND is_admin = 1", { employeeId })

    if (!employee) {
        return res.status(403).json({ message: "Access denied" })
    }

    next()
}
