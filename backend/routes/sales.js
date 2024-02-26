import { Router } from "express"
import { fetchAll, insert, fetch, query } from "../utils/db.js"

const router = Router()

router.get("/", async (req, res) => {
    const employeeId = req.employee.id

    const page = parseInt(req.query.page) ?? 1

    const limit = 10

    const offset = (page * 10) - 10

    const { totalSales } = await fetch(`SELECT COUNT(*) AS totalSales FROM sales WHERE employeeId = ${employeeId}`)

    const sales = await fetchAll(`SELECT sales.id, products.name AS product, customers.name, customers.mobile FROM sales INNER JOIN customers ON customers.id = sales.customerId INNER JOIN products ON products.id = sales.productId WHERE employeeId = ${employeeId} ORDER BY sales.id DESC LIMIT :limit OFFSET :offset`, {
        limit,
        offset
    })

    res.json({
        totalPage: Math.ceil(totalSales / 10),
        data: sales
    })
})

router.post("/", async (req, res) => {
    const employeeId = req.employee.id

    const { name, mobile, productId } = req.body

    const customer = await fetch("SELECT * FROM customers WHERE mobile = :mobile LIMIT 1", { mobile })

    let customerId = null

    if (customer) {
        customerId = customer.id
    } else {
        customerId = await insert("INSERT INTO customers (name, mobile) VALUES (:name, :mobile)", {
            name,
            mobile
        })
    }

    await insert("INSERT INTO sales (customerId, employeeId, productId) VALUES (:customerId, :employeeId, :productId)", {
        customerId,
        employeeId,
        productId
    })

    const { totalSales } = await fetch(`SELECT COUNT(*) AS totalSales FROM sales WHERE employeeId = ${employeeId}`)

    let percentage = 0
    let bonus = 0
    let holidayPackageId = null

    if (totalSales === 50000) {
        const holidayPackage = await fetch(`SELECT id FROM holiday_packages ORDER BY RAND() LIMIT 1`)
        holidayPackageId = holidayPackage.id
        percentage = 5
    } else if (totalSales === 30000) {
        percentage = 3.5
        bonus = 1000
    } else if (totalSales === 20000) {
        percentage = 3
    } else if (totalSales === 10000) {
        percentage = 1.5
    }

    await query(`INSERT INTO incentives (percentage, bonus, holidayPackageId, employeeId) VALUES (${percentage}, ${bonus}, ${holidayPackageId}, ${employeeId})`)

    res.status(201).json({ message: "Sale added successfully" })
})

export default router