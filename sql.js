const mysql = require("mysql2")
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "temnolesie",
    password: "mysql"
}).promise()

class UserSQL{
    static async initialize(){
        const result = await pool.query("CREATE TABLE IF NOT EXISTS users ( nickname TEXT, password TEXT, money INT )")
        console.log("Database created")
    }
    
    static async getUser(nickname){
        const result = await pool.query("SELECT * FROM users WHERE nickname='" + nickname + "'")
        return result
    }

    static async registerUser(nickname, password){
        const data = await this.getUser( nickname )
        console.log(data)
        if(data != [] || data != null){
            return false
        }
        const result = await pool.query("INSERT INTO users (nickname, password, money) VALUES('" + nickname + "','" + password + "', 0)")
        return true
    }

    static async updateUser(nickname, key, value){
        const result = await  pool.query("UPDATE users SET " + key + "=" + value + " WHERE nickname=" + nickname)
    }
}

module.exports = UserSQL