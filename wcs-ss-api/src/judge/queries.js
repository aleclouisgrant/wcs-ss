const getJudges = `SELECT users.id, users.first_name, users.last_name
                FROM users
                INNER JOIN judge_profiles ON users.id = judge_profiles.user_id`;

module.exports = {
    getJudges
}