const mysql = require("mysql2")
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "temnolesie",
    password: "mysql"
}).promise()

const initialize = async() => {
    const result = await pool.query("CREATE TABLE IF NOT EXISTS users ( nickname TEXT, password TEXT, money INT )")
    console.log("Database created")
}

const getUser = async(nickname) => {
    console.log("Getting " + nickname + " from database")
    const result = await pool.query("SELECT * FROM users WHERE nickname='" + nickname + "'")
    return result
}

const registerUser = async(nickname, password) => {
    const data = await this.getUser( nickname )
    if(data[0].length == 0){ // fucking bycicle
        const result = await pool.query("INSERT INTO users (nickname, password, money) VALUES('" + nickname + "','" + password + "', 0)")
        return true
    }
    return false
}

const updateUser = async(nickname, key, value) => {
    const result = await  pool.query("UPDATE users SET " + key + "=" + value + " WHERE nickname=" + nickname)
}

module.exports = { initialize, getUser, updateUser, registerUser }