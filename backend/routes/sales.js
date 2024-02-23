import { Router } from "express"
import { fetchAll, insert, fetch, query } from "../utils/db.js"

const router = Router()

router.get("/", async (req, res) => {
    const { employeeId } = req.local

    const page = req.query.page ?? 1

    const limit = 10

    const offset = (page * 10) - 10

    const { total } = await fetch("SELECT COUNT(*) AS total FROM sales WHERE employee_id = :employeeId", { employeeId })

    const sales = await fetchAll("SELECT * FROM sales INNER JOIN customers ON customers.id = sales.customer_id INNER JOIN products ON products.id = sales.product_id WHERE employee_id = :employeeId ORDER BY sales.id DESC LIMIT :limit OFFSET :offset", {
        limit,
        offset,
        employeeId
    })

    res.json({
        total,
        data: sales
    })
})

router.post("/", async (req, res) => {
    const { employeeId } = req.local

    const { adharNo, productId } = req.body

    const customer = await fetch("SELECT * FROM customers WHERE adhar_no = :adharNo LIMIT 1", { adharNo })

    let customerId = null

    if (customer) {
        customerId = customer.id
    } else {
        customerId = await insert("INSERT INTO customers (adhar_no) VALUES (:adharNo)", {
            adharNo
        })
    }

    await insert("INSERT INTO sales (customer_id, employee_id, product_id) VALUES (:customerId, :employeeId, :productId)", {
        customerId,
        employeeId,
        productId
    })

    const { totalSales } = await fetch("SELECT COUNT(*) AS totalSales FROM sales WHERE employee_id = :employeeId", {
        employeeId
    })

    if (totalSales === 2) {
        await query("INSERT INTO incentives (percentage, employee_id) VALUES (1.5, :employeeId)", { employeeId })
    }

    res.status(201).json({ message: "Sale added successfully" })
})

export default router