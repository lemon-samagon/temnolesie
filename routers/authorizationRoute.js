const express = require("express")
const router = express.Router()
const sql = require("../sql.js")

router.get("/login", (req, res) => {
    if(req.cookies.loggedin != null){
        res.redirect("/profile")
    }else{
        res.render("user/login.ejs", {login_text: "Войти", error_message: ""})
    }
})

router.post("/login", async (req, res) => {
    if (req.body == null) {
        res.render("user/login.ejs", {login_text: "Войти"})
    }else{
        const data = await sql.getUser(req.body.nickname)
        console.log(data[0].length)
        console.log(data[0])
        if(data[0][0]){
            if(data[0][0].nickname == req.body.nickname && data[0][0].password == req.body.password){ 
                res.cookie("loggedin", req.body)
                res.redirect("/")
            }else{
                res.render("user/login.ejs", {login_text: "Войти", error_message: "Неверный пароль!"})    
            }
        }else{
            res.render("user/login.ejs", {login_text: "Войти", error_message: "Такого аккаунта не существует!"})
        }
    }
})

router.get("/register", (req, res) => {
    if(req.cookies.loggedin != null){
        res.redirect("/profile")
    }else{
        res.render("user/register.ejs", {login_text: "Войти", error_message: ""})
    }
})

router.post("/register", async (req, res) => {
    if (req.body == null){
        res.render("user/register.ejs", {login_text: "Войти", error_message: ""})
    }else{
        let canBeRegistered = await sql.registerUser(req.body.nickname, req.body.password)
        if (canBeRegistered) {
            res.cookie("loggedin", req.body)
            res.redirect("/")
        }else{
            res.render("user/register.ejs", {login_text: "Войти", error_message: "Такой аккаунт уже существует!"})
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