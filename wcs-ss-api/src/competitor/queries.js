const getCompetitors = `SELECT users.id, competitor_profiles.id, users.first_name, users.last_name, competitor_profiles.wsdc_id, competitor_profiles.leader_rating, competitor_profiles.follower_rating
        FROM users
        INNER JOIN competitor_profiles ON users.id = competitor_profiles.user_id`;
const getCompetitorByWsdcId = `SELECT users.id, competitor_profiles.id, users.first_name, users.last_name, competitor_profiles.wsdc_id, competitor_profiles.leader_rating, competitor_profiles.follower_rating
        FROM users
        INNER JOIN competitor_profiles ON users.id = competitor_profiles.user_id
        WHERE competitor_profiles.wsdc_id = $1`;
const getCompetitorsByFirstName = `SELECT users.id, competitor_profiles.id, users.first_name, users.last_name, competitor_profiles.wsdc_id, competitor_profiles.leader_rating, competitor_profiles.follower_rating
        FROM users
        INNER JOIN competitor_profiles ON users.id = competitor_profiles.user_id
        WHERE users.first_name = $1`;
const getCompetitorsByLastName = `SELECT users.id, competitor_profiles.id, users.first_name, users.last_name, competitor_profiles.wsdc_id, competitor_profiles.leader_rating, competitor_profiles.follower_rating
        FROM users
        INNER JOIN competitor_profiles ON users.id = competitor_profiles.user_id
        WHERE users.first_name = $1`;
const getCompetitorsByFullName = `SELECT users.id, competitor_profiles.id, users.first_name, users.last_name, competitor_profiles.wsdc_id, competitor_profiles.leader_rating, competitor_profiles.follower_rating
        FROM users
        INNER JOIN competitor_profiles ON users.id = competitor_profiles.user_id
        WHERE users.first_name = $1 AND users.last_name = $2`;

module.exports = {
    getCompetitors,
    getCompetitorByWsdcId,
    getCompetitorsByFirstName,
    getCompetitorsByLastName,
    getCompetitorsByFullName
}