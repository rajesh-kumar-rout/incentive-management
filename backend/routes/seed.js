import { Router } from "express"
import { fetch, query } from "../utils/db.js"

const router = Router()

router.get("/", async (req, res) => {
    const { totalProducts } = await fetch("SELECT COUNT(*) AS totalProducts FROM products")

    if(totalProducts === 0) {
        await query(`
            INSERT INTO products (name) VALUES
            ('Savings Account'),
            ('Current Account'),
            ('Fixed Deposit'),
            ('Recurring Deposit'),
            ('Home Loan'),
            ('Personal Loan'),
            ('Credit Card'),
            ('Car Loan'),
            ('Business Loan'),
            ('Health Insurance')
        `)
    }

    const { totalEmployees } = await fetch("SELECT COUNT(*) AS totalEmployees FROM employees")

    if(totalEmployees === 0) {
        await query(`
            INSERT INTO employees (name, email, password, salary, isAdmin, isActive) VALUES
            ('Admin User', 'admin@example.com', '$2b$10$WtcPje.8Cy3E2nerFfrsF.hp86Ly2ln37RYVlFHsPpcrsJzrRivlC', 40000, TRUE, TRUE),
            ('John Doe', 'john.doe@example.com', '$2b$10$WtcPje.8Cy3E2nerFfrsF.hp86Ly2ln37RYVlFHsPpcrsJzrRivlC', 40000, FALSE, TRUE),
            ('Jane Smith', 'jane.smith@example.com', '$2b$10$WtcPje.8Cy3E2nerFfrsF.hp86Ly2ln37RYVlFHsPpcrsJzrRivlC', 40000, FALSE, TRUE),
            ('Michael Johnson', 'michael.johnson@example.com', '$2b$10$WtcPje.8Cy3E2nerFfrsF.hp86Ly2ln37RYVlFHsPpcrsJzrRivlC', 40000, FALSE, TRUE),
            ('Emily Davis', 'emily.davis@example.com', '$2b$10$WtcPje.8Cy3E2nerFfrsF.hp86Ly2ln37RYVlFHsPpcrsJzrRivlC', 40000, FALSE, TRUE),
            ('Robert Williams', 'robert.williams@example.com', '$2b$10$WtcPje.8Cy3E2nerFfrsF.hp86Ly2ln37RYVlFHsPpcrsJzrRivlC', 40000, FALSE, TRUE),
            ('Amanda Wilson', 'amanda.wilson@example.com', '$2b$10$WtcPje.8Cy3E2nerFfrsF.hp86Ly2ln37RYVlFHsPpcrsJzrRivlC', 40000, FALSE, TRUE),
            ('Daniel Brown', 'daniel.brown@example.com', '$2b$10$WtcPje.8Cy3E2nerFfrsF.hp86Ly2ln37RYVlFHsPpcrsJzrRivlC', 40000, FALSE, TRUE),
            ('Sophia Miller', 'sophia.miller@example.com', '$2b$10$WtcPje.8Cy3E2nerFfrsF.hp86Ly2ln37RYVlFHsPpcrsJzrRivlC', 40000, FALSE, TRUE),
            ('Ethan Jones', 'ethan.jones@example.com', '$2b$10$WtcPje.8Cy3E2nerFfrsF.hp86Ly2ln37RYVlFHsPpcrsJzrRivlC', 40000, FALSE, TRUE)`
        )
    }

    const { totalCustomers } = await fetch("SELECT COUNT(*) AS totalCustomers FROM customers")

    if(totalCustomers === 0) {
        await query(`
            INSERT INTO customers (name, mobile) VALUES
            ('John Doe', '9988774499'),
            ('Jane Smith', '9988774492'),
            ('Michael Johnson', '9988774498'),
            ('Emily Davis', '9988774492'),
        `)
    }

    if (req.query.action === "sales") {
        for (let i = 1; i < 50000; i++) {
            await query("INSERT INTO sales (customerId, employeeId, productId) VALUES (1,2,1)")
        }

        for (let i = 1; i < 30000; i++) {
            await query("INSERT INTO sales (customerId, employeeId, productId) VALUES (2,3,2)")
        }

        for (let i = 1; i < 20000; i++) {
            await query("INSERT INTO sales (customerId, employeeId, productId) VALUES (3,4,3)")
        }

        for (let i = 1; i < 10000; i++) {
            await query("INSERT INTO sales (customerId, employeeId, productId) VALUES (4,5,4)")
        }
    }

    res.send("Seeding database successfully")
})

export default router