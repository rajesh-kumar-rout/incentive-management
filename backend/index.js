import cors from "cors"
import { config } from "dotenv"
import express from "express"
import { authenticate, isActive, isAdmin, isAuthenticated } from "./middlewares/auth.js"
import accountRoute from "./routes/account.js"
import holidayRoute from "./routes/holiday.js"
import permissionRoute from "./routes/permission.js"
import incentiveRoute from "./routes/incentive.js"
import productRoute from "./routes/product.js"
import saleRoute from "./routes/sales.js"
import statisticsRoute from "./routes/statistics.js"
import { fetchAll } from "./utils/db.js"

config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(authenticate)

app.use(
    "/admin/holidays",
    isAuthenticated,
    isActive,
    isAdmin,
    holidayRoute
)

app.use(
    "/admin/permissions",
    isAuthenticated,
    isActive,
    isAdmin,
    permissionRoute
)

app.use(
    "/admin/sales",
    isAuthenticated,
    isActive,
    saleRoute
)

app.use(
    "/admin/products",
    isAuthenticated,
    isActive,
    productRoute
)

app.use(
    "/admin/statistics",
    isAuthenticated,
    isActive,
    statisticsRoute
)

app.use(
    "/admin/incentives",
    isAuthenticated,
    incentiveRoute
)

app.use(
    "/admin/account",
    accountRoute
)
import { query, fetch } from "./utils/db.js"

app.get("/demo", async(req, res) => {
    // for(let i = 1; i < 50000; i++){
    //     await query("INSERT INTO sales (customerId, employeeId, productId) VALUES (1,32,1)")
    // }

    const r = await fetch("SELECT COUNT(*) as toal FROM sales WHERE customerId = 1 AND employeeId = 32 AND productId = 1")
    res.json({r})
})

app.listen(process.env.PORT, () => {
    console.log(`Listing to port ${process.env.PORT}`)
})