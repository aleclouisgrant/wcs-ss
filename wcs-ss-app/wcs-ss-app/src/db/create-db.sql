CREATE TYPE role AS ENUM (
    'leader',
    'follower'
);

CREATE TYPE callback_score AS ENUM (
    'yes',
    'alt1',
    'alt2',
    'alt3',
    'no',
    'unscored'
);

CREATE TYPE division AS ENUM (
    'newcomer',
    'novice',
    'intermediate',
    'advanced',
    'all_star',
    'champion',
    'open'
);

CREATE TYPE round AS ENUM (
    'prelims',
    'quarterfinals',
    'semifinals',
    'finals'
);

CREATE TYPE tier AS ENUM (
    'no_tier',
    'tier1',
    'tier2',
    'tier3',
    'tier4',
    'tier5',
    'tier6'
);

CREATE TABLE users (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE dance_conventions (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE judge_profiles (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    UNIQUE (user_id),
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE competitor_profiles (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    wsdc_id INT,
    leader_rating SMALLINT,
    follower_rating SMALLINT,
    leader_newcomer_points SMALLINT,
    leader_novice_points SMALLINT,
    leader_intermediate_points SMALLINT,
    leader_advanced_points SMALLINT,
    leader_all_star_points SMALLINT,
    leader_champion_points SMALLINT,
    follower_newcomer_points SMALLINT,
    follower_novice_points SMALLINT,
    follower_intermediate_points SMALLINT,
    follower_advanced_points SMALLINT,
    follower_all_star_points SMALLINT,
    follower_champion_points SMALLINT,
    UNIQUE (user_id),
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE competitor_registrations (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    competitor_profile_id UUID,
    dance_convention_id UUID NOT NULL,
    bib_number SMALLINT,
    FOREIGN KEY (competitor_profile_id) REFERENCES competitor_profiles (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (dance_convention_id) REFERENCES dance_conventions (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE competitor_records (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    competition_id UUID NOT NULL,
    competitor_registration_id UUID NOT NULL,
    placement SMALLINT,
    points_earned SMALLINT,
    pre_rating SMALLINT,
    post_rating SMALLINT,
    FOREIGN KEY (competition_id) REFERENCES competitions (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (competitor_registration_id) REFERENCES competitor_registrations (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE competitions (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    dance_convention_id UUID NOT NULL,
    division division,
    leader_tier tier,
    follower_tier tier,
    FOREIGN KEY (dance_convention_id) REFERENCES dance_conventions (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE prelim_competitions (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    competition_id UUID NOT NULL,
    date_time TIMESTAMP,
    role role NOT NULL,
    round round NOT NULL,
    alternate1_id uuid,
    alternate2_id uuid,
    FOREIGN KEY (competition_id) REFERENCES competitions (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (alternate1_id) REFERENCES competitor_profiles (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (alternate2_id) REFERENCES competitor_profiles (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE promoted_competitors (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    prelim_competition_id UUID NOT NULL,
    competitor_id UUID NOT NULL,
    FOREIGN KEY (prelim_competition_id) REFERENCES prelim_competitions (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (competitor_id) REFERENCES competitor_profiles (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE prelim_scores (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    prelim_competition_id UUID NOT NULL,
    judge_id UUID,
    competitor_id UUID,
    callback_score callback_score NOT NULL,
    FOREIGN KEY (prelim_competition_id) REFERENCES prelim_competitions (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (judge_id) REFERENCES judge_profiles (id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (competitor_id) REFERENCES competitor_profiles (id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE final_competitions (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    competition_id UUID NOT NULL,
    date_time TIMESTAMP,
    FOREIGN KEY (competition_id) REFERENCES competitions (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE placements (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    final_competition_id UUID NOT NULL,
    leader_id UUID,
    follower_id UUID,
    placement SMALLINT NOT NULL,
    FOREIGN KEY (final_competition_id) REFERENCES final_competitions (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (leader_id) REFERENCES competitor_profiles (id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (follower_id) REFERENCES competitor_profiles (id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE final_scores (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    final_competition_id UUID NOT NULL,
    judge_id UUID,
    leader_id UUID,
    follower_id UUID,
    score SMALLINT NOT NULL,
    FOREIGN KEY (final_competition_id) REFERENCES final_competitions (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (judge_id) REFERENCES judge_profiles (id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (leader_id) REFERENCES competitor_profiles (id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (follower_id) REFERENCES competitor_profiles (id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);