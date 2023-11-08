import { Guid } from './Guid';
import { Competitor, Judge } from './IPerson';
import { Round, Tier, Division, Role } from './Enums';
import { Util } from './Util';
import { FinalScore, PrelimScore } from './IScore';

export class PrelimCompetition {
    public Id: Guid;
    private _date: Date;

    public Scores: Array<PrelimScore>;

    public Name: string;
    public Division: Division;
    public Round: Round;
    public Role: Role;

    public Competitors: Array<Competitor>;
    public Judges: Array<Judge>;

    public Promoted: Array<Competitor>;

    constructor(name?: string, date? : Date, division?: Division, round?: Round, role?: Role) {
        this.Id = Guid.MakeNew();

        this.Name = name ?? "";
        this._date = date ?? new Date();
        this.Division = division ?? Division.Open;
        this.Round = round ?? Round.Prelims;
        this.Role = role ?? Role.Leader;

        this.Scores = new Array<PrelimScore>;

        this.Competitors = new Array<Competitor>();
        this.Judges = new Array<Judge>();
        this.Promoted = new Array<Competitor>;
    }

    public Print() {
        var print = "";

        print += "Name: " + this.Name + '\n';
        print += "Date: " + this._date + '\n';
        print += "Division: " + this.Division + '\n';
        print += "Role: " + this.Role + '\n';
        print += "Round: " + this.Round + '\n';

        print += "Judges: ";
        var judges = "";
        this.Judges.map((judge) => {
            judges += judge.FullName + ", ";
        })
        print += judges + '\n';

        print += "Scores: " + '\n';
        
        this.Competitors.map((competitor, index) => {
            var judgeScores = (index + 1).toString() + ": ";
            if (this.IsCompetitorPromoted(competitor)){
                judgeScores += "*";
            }
            judgeScores += competitor.BibNumber.toString() + " ";
            judgeScores += competitor.FullName + ": ";

            this.ScoresByCompetitor(competitor).map((score) => {
                judgeScores += Util.CallbackScoreShorthand(score.CallbackScore) + " ";
            })
            print += judgeScores + '\n';
        });
        
        console.log(print);
    }

    public get Tier(): Tier {
        return Util.GetTier(this.Competitors.length);
    }

    public GetCompetitorCount(): number {
        return this.Competitors.length;
    }

    public AddScores(scores: Array<PrelimScore>) {
        this.Scores = scores;

        this.Scores.forEach((value) => {
            if (value.Competitor != null) {
                if (!this.Competitors.includes(value.Competitor)) {
                    this.Competitors.push(value.Competitor);
                }
            }
            if (value.Judge != null) {
                if (!this.Judges.includes(value.Judge)) {
                    this.Judges.push(value.Judge);
                }
            }
        });
    }

    public ScoresByCompetitor(competitor: Competitor): Array<PrelimScore> {
        var scores = new Array<PrelimScore>;

        this.Scores.forEach((value) => {
            if (value.Competitor == null) {
                return;
            }

            if (value.Competitor.Id == competitor.Id) {
                scores.push(value);
            }
        });

        return scores;
    }

    public GetCompetitorsSum(competitor: Competitor): number {
        var scores = this.ScoresByCompetitor(competitor);
        var sum = 0;

        scores.forEach((score) => {
            var value = Util.GetCallbackScoreNumber(score.CallbackScore);
            if (value == -1) {
                // unscored score
            }
            else {
                sum = sum + value;
            }
        })

        return Math.round(sum * 10) / 10;
    }

    public AddPromotedCompetitor(competitor: Competitor) {
        this.Promoted.push(competitor);
    }

    public AddPromotedCompetitors(competitors: Array<Competitor>) {
        competitors.forEach((competitor) => {
            this.AddPromotedCompetitor(competitor);
        })
    }

    public IsCompetitorPromoted(competitor: Competitor): boolean {
        return this.Promoted.includes(competitor);
    }
}

export class FinalCompetition {
    private _id: Guid;
    private _date: Date;

    private _leaders: Array<Competitor>;
    private _followers: Array<Competitor>;
    private _judges: Array<Judge>;

    private _leaderTier: Tier;
    private _followerTier: Tier;

    public Name: string;
    public Division: Division;
    public Round: Round;

    public Scores: Array<FinalScore>;
    public Placements: Array<{leader: Competitor, follower: Competitor}>;

    constructor(name: string, date?: Date, division?: Division) {
        this._id = Guid.MakeNew();
        this.Round = Round.Finals;

        this._leaderTier = Tier.NoTier;
        this._followerTier = Tier.NoTier;

        this._leaders = new Array<Competitor>();
        this._followers = new Array<Competitor>();
        this._judges = new Array<Judge>();
        
        this.Scores = new Array<FinalScore>();
        this.Placements = new Array<{leader: Competitor, follower: Competitor}>();

        this._date = date ?? new Date();
        this.Name = name ?? "";
        this.Division = division ?? Division.Open;
    }

    public get LeaderTier() {
        return Util.GetTier(this._leaders.length);
    }

    public get FollowerTier() {
        return Util.GetTier(this._followers.length);
    }

    public AddScores(scores: Array<FinalScore>) {
        this.Scores = scores;

        this.Scores.forEach((value) => {
            if (value.Leader != null) {
                if (!this._leaders.includes(value.Leader)) {
                    this._leaders.push(value.Leader);
                }
            }
            
            if (value.Follower != null) {
                if (!this._followers.includes(value.Follower)) {
                    this._followers.push(value.Follower);
                }
            }

            if (value.Judge != null) {
                if (!this._judges.includes(value.Judge)) {
                    this._judges.push(value.Judge);
                }
            }
        });
    }

    public AddLeader(competitor: Competitor) {
        this._leaders.push(competitor);
    }

    public AddFollower(competitor: Competitor) {
        this._followers.push(competitor);
    }

    public GetLeaderCount(): number {
        return this._leaders.length;
    }

    public GetFollowerCount(): number {
        return this._followers.length;
    }
}