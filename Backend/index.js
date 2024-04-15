require("dotenv").config()
const express = require("express")
const connectDB = require("./db/connectDB")
const bodyParser = require("body-parser");
const cors = require("cors")
const user = require("./routes/userRoutes");
const category = require("./routes/categoryRoutes")
const product = require("./routes/productRoutes")
const cart = require("./routes/cartRoutes")
const order = require("./routes/orderRoutes")

const app = express()
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({origin:"*"}));

app.use("/api/v1/user",user)
app.use("/api/v1/category",category)
app.use("/api/v1/product",product)
app.use("/api/v1/cart",cart)
app.use("/api/v1/order",order)

const port = process.env.PORT
const mongo_url = process.env.MONGO_URL
const start = async ()=>{
    await connectDB(mongo_url)
    app.listen(port, ()=>{
        console.log(`Server is listening on PORT: ${port}`);
    })
}

start()