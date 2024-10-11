const pool = require('../../db');
const queries = require('./queries');

const getCompetitionList = (req, res) => {
    pool.query(queries.getCompetitionList, (error, results) => {
            if (error)
                throw error;

            res.status(200).json(results.rows);
        });
}

module.exports = {
    getCompetitionList,
};