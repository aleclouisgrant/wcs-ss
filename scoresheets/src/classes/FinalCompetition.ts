import { Division, IFinalCompetition, Round, Uuid } from "wcs-ss-lib";
import { Competitor } from "./Competitor";
import { Judge } from "./Judge";
import { FinalScore } from "./FinalScore";

export class FinalCompetition implements IFinalCompetition {
    private _id: Uuid;
    private _date: Date;

    private _leaders: Array<Competitor>;
    private _followers: Array<Competitor>;
    
    public Judges: Array<Judge>;
    public Division: Division;
    public Round: Round;

    public Scores: Array<Array<FinalScore>>;

    constructor(date?: Date, division?: Division) {
        this._id = Uuid.MakeNew();
        this.Round = Round.Finals;

        this._leaders = new Array<Competitor>();
        this._followers = new Array<Competitor>();
        this.Judges = new Array<Judge>();
        
        this.Scores = new Array<Array<FinalScore>>();

        this._date = date ?? new Date();
        this.Division = division ?? Division.Open;
    }

    public Print() {
        var print = "";

        print += "Date: " + this._date + '\n';
        print += "Division: " + this.Division + '\n';
        print += "Round: " + this.Round + '\n';

        print += "Judges: ";
        var judges = "";
        this.Judges.forEach((judge) => {
            judges += judge.FullName + ", ";
        })
        print += judges + '\n';

        print += "Scores: " + '\n';
        
        this.Scores.forEach((coupleScores, place) => {
            var leader = coupleScores[0]?.Leader;
            var follower = coupleScores[0]?.Follower;
            print += place + " ";
            print += leader?.FullName + "(" + leader?.BibNumber + ")";
            print += follower?.FullName + "(" + follower?.BibNumber + ")";

            coupleScores.forEach((value) => {
                print += value.Score + " ";
            });

            print += '\n';
        });
        
        console.log(print);
    }

    public GetPlacement(competitor: Competitor) : number {
        var placement = 0;

        this.Scores.forEach((coupleScores, index) => {
            if (coupleScores[0].Leader?.FullName == competitor.FullName || coupleScores[0].Follower?.FullName == competitor.FullName) {
                placement = index + 1;
            }
        });

        return placement;
    }

    public SetScores(scores: Array<Array<FinalScore>>) {
        this.Scores = scores;

        this.Scores.forEach((coupleScores, place) => {
            coupleScores.forEach((value) => {
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
                    if (!this.Judges.includes(value.Judge)) {
                        this.Judges.push(value.Judge);
                    }
                }
            });
        });
    }

    public get CoupleCount() : number {
        return this.Scores.length;
    }
}