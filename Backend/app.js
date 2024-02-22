require("dotenv").config()
const express = require("express")
const connectDB = require("./db/connectDB")
const session = require('express-session');
const bodyParser = require("body-parser");
const cors = require("cors")
const user = require("./routes/userRoutes");

const app = express()
app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret:process.env.EXPRESS_SESSION_SECRET}))

app.use("/api/v1/user",user)

const port = process.env.PORT
const mongo_url = process.env.MONGO_URL
const start = async ()=>{
    await connectDB(mongo_url)
    app.listen(port, ()=>{
        console.log(`Server is listening on PORT: ${port}`);
    })
}

start()