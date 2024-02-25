const express = require("express")
const router = express.Router()
const sql = require("../sql.js")

router.get("/", (req, res) => {
    let login_text = "Войти"
    if (req.cookies.loggedin != null) {
        login_text = "Профиль"
    }
    res.render("user/index.ejs", { login_text: login_text })
})

router.get("/profile", async (req, res) => {
    if(req.cookies.loggedin != null){
        let data = await sql.getUser( req.cookies.loggedin.nickname )
        console.log(req.cookies.loggedin.nickname)
        console.log(data)
        res.render("user/profile.ejs", { nickname: req.cookies.loggedin.nickname, money: data[0][0].money })
    }else{
        res.redirect("/login")
    }
})

module.exports = router