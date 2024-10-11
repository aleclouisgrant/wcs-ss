const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "WCS-SS-DB",
    password: "",
    port: "5432"
});

module.exports = pool;