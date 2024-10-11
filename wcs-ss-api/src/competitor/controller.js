const pool = require('../../db');
const queries = require('./queries');

const getCompetitors = (req, res) => {
    pool.query(queries.getCompetitors, (error, results) => {
            if (error)
                throw error;

            res.status(200).json(results.rows);
        });
}
const getCompetitorByWsdcId = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getCompetitorByWsdcId, [id], (error, results) => {
        if (error)
            throw error;

        res.status(200).json(results.rows);
    })
}

module.exports = {
    getCompetitors,
    getCompetitorByWsdcId,
};