import { Division, IPrelimCompetition, Role, Round, Tier, Uuid, WcsUtil } from "wcs-ss-lib";
import { PrelimScore } from "./PrelimScore";
import { Competitor } from "./Competitor";
import { Judge } from "./Judge";

export class PrelimCompetition implements IPrelimCompetition {
    public Id: Uuid;
    private _date: Date;

    public Scores: Array<PrelimScore>;

    public Division: Division;
    public Round: Round;
    public Role: Role;

    public Competitors: Array<Competitor>;
    public Judges: Array<Judge>;

    public Promoted: Array<Competitor>;

    constructor(date? : Date, division?: Division, round?: Round, role?: Role) {
        this.Id = Uuid.MakeNew();

        this._date = date ?? new Date();
        this.Division = division ?? Division.Open;
        this.Round = round ?? Round.Prelims;
        this.Role = role ?? Role.Leader;

        this.Scores = new Array<PrelimScore>;

        this.Competitors = new Array<Competitor>();
        this.Judges = new Array<Judge>();
        this.Promoted = new Array<Competitor>;
    }
    Alternate1: Competitor | undefined;
    Alternate2: Competitor | undefined;

    public Print() {
        var print = "";

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
            judgeScores += competitor.BibNumber?.toString() + " ";
            judgeScores += competitor.FullName + ": ";

            this.ScoresByCompetitor(competitor).map((score) => {
                judgeScores += WcsUtil.GetCallbackScoreShorthand(score.CallbackScore) + " ";
            })
            print += judgeScores + '\n';
        });
        
        console.log(print);
    }

    public get Tier(): Tier {
        return WcsUtil.GetTier(this.Competitors.length);
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
            var value = WcsUtil.GetCallbackScoreValue(score.CallbackScore);
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