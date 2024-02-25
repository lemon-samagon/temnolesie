const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const sql = require("./sql.js")

const indexRoute = require("./routers/indexRoute.js")
const authRoute = require("./routers/authorizationRoute.js")
const adminRoute = require("./routers/adminRoute.js")

const app = express()
const host = "localhost"
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())

app.use(indexRoute)
app.use(authRoute)
app.use(adminRoute)

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.engine("html", require("ejs").renderFile)

app.listen(port, host, async () =>{
    console.log("WebSite started on http://" + host + ":" + port)
    await sql.initialize()
})