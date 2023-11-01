import { Guid } from './Guid';
import { Competitor, Judge } from './IPerson';
import { Round, Tier, Division, Role } from './Enums';
import { Util } from './Util';
import { PrelimScore } from './IScore';

export class PrelimCompetition {
    private _id: Guid;
    private _date: Date;

    private _scores: Array<PrelimScore>;

    public Name: string;
    public Division: Division;
    public Round: Round;
    public Role: Role;

    public Competitors: Array<Competitor>;
    public Judges: Array<Judge>;

    public Promoted: Array<Competitor>;

    constructor(name?: string, date? : Date, division?: Division, round?: Round, role?: Role) {
        this._id = Guid.MakeNew();

        this.Name = name ?? "";
        this._date = date ?? new Date();
        this.Division = division ?? Division.Open;
        this.Round = round ?? Round.Prelims;
        this.Role = role ?? Role.Leader;

        this._scores = new Array<PrelimScore>;

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
        
        this.Competitors.map((competitor) => {
            var judgeScores = "";
            if (this.IsCompetitorPromoted(competitor)){
                judgeScores += "*";
            }
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
        this._scores = scores;

        this._scores.forEach((value) => {
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

    public get Scores(): Array<PrelimScore> {
        return this._scores;
    }

    public ScoresByCompetitor(competitor: Competitor): Array<PrelimScore> {
        var scores = new Array<PrelimScore>;

        this._scores.forEach((value) => {
            if (value.Competitor == null) {
                return;
            }

            if (value.Competitor.FullName == competitor.FullName) {
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
                // TOOD: do we need to throw awareness?
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
    private _leaderTier: Tier;
    private _followerTier: Tier;

    public Name: string;
    public Division: Division;
    public Round: Round;

    constructor(name: string, division?: Division, round?: Round) {
        this._id = Guid.MakeNew();

        this._leaderTier = Tier.NoTier;
        this._followerTier = Tier.NoTier;

        this._date = new Date();
        this._leaders = new Array<Competitor>();
        this._followers = new Array<Competitor>();

        this.Name = name != null ? name : "";
        this.Division = division != null ? division : Division.Open;
        this.Round = round != null ? round : Round.Finals;
    }

    public get LeaderTier() {
        return Util.GetTier(this._leaders.length);
    }

    public get FollowerTier() {
        return Util.GetTier(this._followers.length);
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