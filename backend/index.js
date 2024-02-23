import express from "express"
import holidayRoute from "./routes/holiday.js"
import productRoute from "./routes/product.js"
import { authenticate, isAdmin } from "./middlewares/auth.js"
import permissionRoute from "./routes/permission.js"
import saleRoute from "./routes/sales.js"
import accountRoute from "./routes/account.js"
import { config } from "dotenv"

config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/admin/holidays", authenticate, isAdmin, holidayRoute)
app.use("/admin/permissions", authenticate, isAdmin, permissionRoute)
app.use("/admin/sales", authenticate, saleRoute)
app.use("/admin/products", authenticate, productRoute)
app.use("/admin/account", accountRoute)

app.listen(process.env.PORT, () => {
    console.log(`Listing to port ${process.env.PORT}`)
})