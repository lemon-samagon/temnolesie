const express = require("express")
const path = require("path")
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.engine("html", require("ejs").renderFile)

app.get("/", (req, res) => {
    res.render("index.ejs", { price: 100 })
})

app.get("/profile", (req, res) => {
    res.render("profile.ejs")
})

app.listen(port)