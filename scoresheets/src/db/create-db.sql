CREATE TYPE role_type AS ENUM (
    'leader',
    'follower'
);

CREATE TYPE callbackscore_type AS ENUM (
    'unscored',
    'yes',
    'alternate_one',
    'alternate_two',
    'alternate_three',
    'no'
);

CREATE TYPE division_type AS ENUM (
    'open',
    'newcomer',
    'novice',
    'intermediate',
    'advanced',
    'allstar',
    'champion'
);

CREATE TYPE round_type AS ENUM (
    'prelims',
    'quarterfinals',
    'semifinals',
    'finals'
);

CREATE TYPE tier_type AS ENUM (
    'no_tier',
    'tier_one',
    'tier_two',
    'tier_three',
    'tier_four',
    'tier_five',
    'tier_six'
);

CREATE TABLE users (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    first_name TEXT,
    last_name TEXT,
    wsdc_id INT
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

CREATE TABLE competitions (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    dance_convention_id UUID NOT NULL,
    division division_type,
    leader_tier tier_type,
    follower_tier tier_type,
    FOREIGN KEY (dance_convention_id) REFERENCES dance_conventions (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE competitor_profiles (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    leader_division division_type,
    leader_allowed_division division_type,
    leader_newcomer_points SMALLINT,
    leader_novice_points SMALLINT,
    leader_intermediate_points SMALLINT,
    leader_advanced_points SMALLINT,
    leader_allstar_points SMALLINT,
    leader_champion_points SMALLINT,
    follower_division division_type,
    follower_allowed_division division_type,
    follower_newcomer_points SMALLINT,
    follower_novice_points SMALLINT,
    follower_intermediate_points SMALLINT,
    follower_advanced_points SMALLINT,
    follower_allstar_points SMALLINT,
    follower_champion_points SMALLINT,
    UNIQUE (user_id),
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE competitor_records (
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

CREATE TABLE prelim_competitions (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    competition_id UUID NOT NULL,
    datetime TIMESTAMP,
    role role_type NOT NULL,
    round round_type NOT NULL,
    promoted_competitors UUID[] NOT NULL,
    competitors_ranking UUID[] NOT NULL,
    FOREIGN KEY (competition_id) REFERENCES competitions (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE final_competitions (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    competition_id UUID NOT NULL,
    datetime TIMESTAMP,
    placements UUID[] NOT NULL,
    FOREIGN KEY (competition_id) REFERENCES competitions (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE prelim_scores (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    prelim_competition_id UUID NOT NULL,
    judge_id UUID NOT NULL,
    competitor_id UUID NOT NULL,
    callbackscore callbackscore_type NOT NULL,
    FOREIGN KEY (prelim_competition_id) REFERENCES prelim_competitions (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (judge_id) REFERENCES judge_profiles (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (competitor_id) REFERENCES competitor_records (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE final_scores (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    final_competition_id UUID NOT NULL,
    judge_id UUID NOT NULL,
    leader_id UUID NOT NULL,
    follower_id UUID NOT NULL,
    score SMALLINT NOT NULL,
    FOREIGN KEY (final_competition_id) REFERENCES final_competitions (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (judge_id) REFERENCES judge_profiles (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (leader_id) REFERENCES competitor_records (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (follower_id) REFERENCES competitor_records (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);