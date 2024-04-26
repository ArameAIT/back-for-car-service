import mysql2 from "mysql2/promise"

const pool = mysql2.createPool({
    host : "localhost",
    port : 3306,
    database : "car_service",
    user : "root",
    password : "Arame223344-"
})

export default pool