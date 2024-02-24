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
        res.render("profile.ejs", { nickname: req.cookies.loggedin.nickname, money: data[0][0].money })
    }else{
        res.redirect("/login")
    }
})

router.get("/login", (req, res) => {
    if(req.cookies.loggedin != null){
        res.redirect("/profile")
    }else{
        res.render("login.ejs", {login_text: "Войти", error_message: ""})
    }
})

router.post("/login", async (req, res) => {
    if (req.body == null) {
        res.render("login.ejs", {login_text: "Войти"})
    }else{
        const data = await sql.getUser(req.body.nickname)
        console.log(data[0].length)
        console.log(data[0])
        if(data[0][0]){
            if(data[0][0].nickname == req.body.nickname && data[0][0].password == req.body.password){ 
                res.cookie("loggedin", req.body)
                res.redirect("/")
            }else{
                res.render("login.ejs", {login_text: "Войти", error_message: "Неверный пароль!"})    
            }
        }else{
            res.render("login.ejs", {login_text: "Войти", error_message: "Такого аккаунта не существует!"})
        }
    }
})

router.get("/register", (req, res) => {
    if(req.cookies.loggedin != null){
        res.redirect("/profile")
    }else{
        res.render("register.ejs", {login_text: "Войти", error_message: ""})
    }
})

router.post("/register", async (req, res) => {
    if (req.body == null){
        res.render("register.ejs", {login_text: "Войти", error_message: ""})
    }else{
        let canBeRegistered = await sql.registerUser(req.body.nickname, req.body.password)
        if (canBeRegistered) {
            res.cookie("loggedin", req.body)
            res.redirect("/")
        }else{
            res.render("register.ejs", {login_text: "Войти", error_message: "Такой аккаунт уже существует!"})
        }
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