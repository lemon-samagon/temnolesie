const express = require("express")
const router = express.Router()
const sql = require("./sql.js")

router.get("/", (req, res) => {
    let login_text = "Войти"
    if (req.cookies.loggedin != null) {
        login_text = "Профиль"
    }
    res.render("index.ejs", { login_text: login_text })
})

router.get("/profile", async (req, res) => {
    if(req.cookies.loggedin != null){
        let data = await sql.getUser( req.cookies.loggedin.nickname )
        console.log(req.cookies.loggedin.nickname)
        console.log(data)
        res.render("profile.ejs", { nickname: req.cookies.loggedin.nickname })
    }else{
        res.redirect("/login")
    }
})

router.get("/login", (req, res) => {
    if(req.cookies.loggedin != null){
        res.redirect("/profile")
    }else{
        res.render("login.ejs", {login_text: "Войти"})
    }
})

router.get("/register", (req, res) => {
    if(req.cookies.loggedin != null){
        res.redirect("/profile")
    }else{
        res.render("register.ejs", {login_text: "Войти"})
    }
})

router.post("/api/login", (req, res) => {
    if (req.body == null) {
        res.redirect("/login")
    }else{
        if(sql.getUser(req.body.nickname)){
            res.cookie("loggedin", req.body)
        }
        res.redirect("/")
    }
})

router.post("/api/register", async (req, res) => {
    if (req.body == null){
        res.redirect("/register")
    }else{
        if(await sql.registerUser(req.body.nickname, req.body.password)){
            res.cookie("loggedin", req.body)
        }
        res.redirect("/")
    }
})

router.get("/logout", (req, res) => {
    if(req.cookies.loggedin != null){
        res.clearCookie("loggedin")
        res.redirect("/")
    }else{
        res.sendStatus(200)
    }
})

module.exports = router