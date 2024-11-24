const pool = require('../../db');
const queries = require('./queries');

const getJudges = (req, res) => {
    pool.query(queries.getJudges, (error, results) => {
            if (error)
                throw error;

            res.status(200).json(results.rows);
        });
}

module.exports = {
    getJudges
};