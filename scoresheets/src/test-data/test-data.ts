import { FinalCompetition, PrelimCompetition } from '@/classes/Competition';
import { DanceEvent } from '@/classes/DanceEvent';
import { CallbackScore, Division, Role, Round } from '@/classes/Enums';
import { Competitor, Judge } from '@/classes/IPerson';
import { FinalScore, PrelimScore } from '@/classes/IScore';

var brandon = new Competitor("Brandon", "Rasmussen", 301);
var stan = new Competitor("Stanislav", "Ivanov", 313);
var glen = new Competitor("Glen", "Acheampong", 735);
var jung = new Competitor("Jung", "Choe", 692);
var kaiano = new Competitor("Kaiano", "Levine", 690);
var edem = new Competitor("Edem", "Attikese", 775);
var steve = new Competitor("Steve", "Wilder", 330);
var alec = new Competitor("Alec", "Grant", 779);
var matt = new Competitor("Matt", "Davis", 707);
var david = new Competitor("David", "Carrington", 316);
var keith = new Competitor("Keith", "Stremmel", 678);

var jen = new Competitor("Jen", "Ferreira", 308);
var margie = new Competitor("Margie", "Tuttle" , 647);
var alyssa = new Competitor("Alyssa", "Lundgren" , 791);
var kristen_shaw = new Competitor("Kristen", "Shaw" , 633);
var kristen = new Competitor("Kristen", "Wallace", 769);
var lara = new Competitor("Lara", "Deni", 688);
var elli = new Competitor("Elli", "Warner", 310);
var tessa = new Competitor("Tessa", "Antolini", 628);
var kendra = new Competitor("Kendra", "Zara", 746);
var jia = new Competitor("Jia", "Liu", 669);

var arjay = new Judge("Arjay", "Centeno");
var erica = new Judge("Erica", "Smith");
var festa = new Judge("John", "Festa");
var markus = new Judge("Markus", "Smith");
var tren = new Judge("Tren", "Veal");

var flore = new Judge("Flore", "Berne");

var score1 = new PrelimScore(brandon, arjay, CallbackScore.Yes);
var score2 = new PrelimScore(brandon, erica, CallbackScore.Yes);
var score3 = new PrelimScore(brandon, festa, CallbackScore.Yes);
var score4 = new PrelimScore(brandon, markus, CallbackScore.Yes);
var score5 = new PrelimScore(brandon, tren, CallbackScore.Yes);

var score6 = new PrelimScore(stan, arjay, CallbackScore.Yes);
var score7 = new PrelimScore(stan, erica, CallbackScore.Yes);
var score8 = new PrelimScore(stan, festa, CallbackScore.Yes);
var score9 = new PrelimScore(stan, markus, CallbackScore.Yes);
var score10 = new PrelimScore(stan, tren, CallbackScore.Yes);

var score11 = new PrelimScore(glen, arjay, CallbackScore.Yes);
var score12 = new PrelimScore(glen, erica, CallbackScore.Yes);
var score13 = new PrelimScore(glen, festa, CallbackScore.Yes);
var score14 = new PrelimScore(glen, markus, CallbackScore.Yes);
var score15 = new PrelimScore(glen, tren, CallbackScore.Yes);

var score16 = new PrelimScore(jung, arjay, CallbackScore.Yes);
var score17 = new PrelimScore(jung, erica, CallbackScore.Alternate2);
var score18 = new PrelimScore(jung, festa, CallbackScore.Yes);
var score19 = new PrelimScore(jung, markus, CallbackScore.Yes);
var score20 = new PrelimScore(jung, tren, CallbackScore.Yes);

var score21 = new PrelimScore(kaiano, arjay, CallbackScore.Yes);
var score22 = new PrelimScore(kaiano, erica, CallbackScore.Yes);
var score23 = new PrelimScore(kaiano, festa, CallbackScore.Alternate3);
var score24 = new PrelimScore(kaiano, markus, CallbackScore.No);
var score25 = new PrelimScore(kaiano, tren, CallbackScore.Yes);

var score26 = new PrelimScore(edem, arjay, CallbackScore.Alternate1);
var score27 = new PrelimScore(edem, erica, CallbackScore.No);
var score28 = new PrelimScore(edem, festa, CallbackScore.Yes);
var score29 = new PrelimScore(edem, markus, CallbackScore.Yes);
var score30 = new PrelimScore(edem, tren, CallbackScore.Alternate2);

var score31 = new PrelimScore(steve, arjay, CallbackScore.Alternate3);
var score32 = new PrelimScore(steve, erica, CallbackScore.Yes);
var score33 = new PrelimScore(steve, festa, CallbackScore.Alternate2);
var score34 = new PrelimScore(steve, markus, CallbackScore.Alternate2);
var score35 = new PrelimScore(steve, tren, CallbackScore.Alternate1);

var score36 = new PrelimScore(alec, arjay, CallbackScore.Alternate2);
var score37 = new PrelimScore(alec, erica, CallbackScore.Alternate3);
var score38 = new PrelimScore(alec, festa, CallbackScore.Alternate1);
var score39 = new PrelimScore(alec, markus, CallbackScore.Alternate1);
var score40 = new PrelimScore(alec, tren, CallbackScore.Alternate3);

var score41 = new PrelimScore(matt, arjay, CallbackScore.No);
var score42 = new PrelimScore(matt, erica, CallbackScore.Alternate1);
var score43 = new PrelimScore(matt, festa, CallbackScore.No);
var score44 = new PrelimScore(matt, markus, CallbackScore.No);
var score45 = new PrelimScore(matt, tren, CallbackScore.No);

var score46 = new PrelimScore(david, arjay, CallbackScore.No);
var score47 = new PrelimScore(david, erica, CallbackScore.No);
var score48 = new PrelimScore(david, festa, CallbackScore.No);
var score49 = new PrelimScore(david, markus, CallbackScore.Alternate3);
var score50 = new PrelimScore(david, tren, CallbackScore.No);

var score51 = new PrelimScore(keith, arjay, CallbackScore.No);
var score52 = new PrelimScore(keith, erica, CallbackScore.No);
var score53 = new PrelimScore(keith, festa, CallbackScore.No);
var score54 = new PrelimScore(keith, markus, CallbackScore.No);
var score55 = new PrelimScore(keith, tren, CallbackScore.No);


var score56 = new PrelimScore(jen, arjay, CallbackScore.Yes);
var score57 = new PrelimScore(jen, erica, CallbackScore.Yes);
var score58 = new PrelimScore(jen, festa, CallbackScore.Yes);
var score59 = new PrelimScore(jen, markus, CallbackScore.Yes);
var score60 = new PrelimScore(jen, tren, CallbackScore.Yes);

var score61 = new PrelimScore(margie, arjay, CallbackScore.Yes);
var score62 = new PrelimScore(margie, erica, CallbackScore.Yes);
var score63 = new PrelimScore(margie, festa, CallbackScore.Yes);
var score64 = new PrelimScore(margie, markus, CallbackScore.Yes);
var score65 = new PrelimScore(margie, tren, CallbackScore.Yes);

var score66 = new PrelimScore(alyssa, arjay, CallbackScore.Alternate1);
var score67 = new PrelimScore(alyssa, erica, CallbackScore.Yes);
var score68 = new PrelimScore(alyssa, festa, CallbackScore.Yes);
var score69 = new PrelimScore(alyssa, markus, CallbackScore.Yes);
var score70 = new PrelimScore(alyssa, tren, CallbackScore.Yes);

var score71 = new PrelimScore(kristen_shaw, arjay, CallbackScore.Yes);
var score72 = new PrelimScore(kristen_shaw, erica, CallbackScore.Alternate2);
var score73 = new PrelimScore(kristen_shaw, festa, CallbackScore.Alternate2);
var score74 = new PrelimScore(kristen_shaw, markus, CallbackScore.Yes);
var score75 = new PrelimScore(kristen_shaw, tren, CallbackScore.Yes);

var score76 = new PrelimScore(kristen, arjay, CallbackScore.Yes);
var score77 = new PrelimScore(kristen, erica, CallbackScore.Yes);
var score78 = new PrelimScore(kristen, festa, CallbackScore.Yes);
var score79 = new PrelimScore(kristen, markus, CallbackScore.Alternate2);
var score80 = new PrelimScore(kristen, tren, CallbackScore.Alternate3);

var score81 = new PrelimScore(lara, arjay, CallbackScore.Alternate2);
var score82 = new PrelimScore(lara, erica, CallbackScore.Yes);
var score83 = new PrelimScore(lara, festa, CallbackScore.No);
var score84 = new PrelimScore(lara, markus, CallbackScore.Yes);
var score85 = new PrelimScore(lara, tren, CallbackScore.Yes);

var score86 = new PrelimScore(elli, arjay, CallbackScore.Yes);
var score87 = new PrelimScore(elli, erica, CallbackScore.No);
var score88 = new PrelimScore(elli, festa, CallbackScore.Yes);
var score89 = new PrelimScore(elli, markus, CallbackScore.No);
var score90 = new PrelimScore(elli, tren, CallbackScore.Alternate1);

var score91 = new PrelimScore(tessa, arjay, CallbackScore.No);
var score92 = new PrelimScore(tessa, erica, CallbackScore.Alternate1);
var score93 = new PrelimScore(tessa, festa, CallbackScore.No);
var score94 = new PrelimScore(tessa, markus, CallbackScore.Alternate3);
var score95 = new PrelimScore(tessa, tren, CallbackScore.Alternate2);

var score96 = new PrelimScore(kendra, arjay, CallbackScore.Alternate3);
var score97 = new PrelimScore(kendra, erica, CallbackScore.Alternate3);
var score98 = new PrelimScore(kendra, festa, CallbackScore.Alternate3);
var score99 = new PrelimScore(kendra, markus, CallbackScore.No);
var score100 = new PrelimScore(kendra, tren, CallbackScore.No);

var score101 = new PrelimScore(jia, arjay, CallbackScore.No);
var score102 = new PrelimScore(jia, erica, CallbackScore.No);
var score103 = new PrelimScore(jia, festa, CallbackScore.Alternate1);
var score104 = new PrelimScore(jia, markus, CallbackScore.Alternate1);
var score105 = new PrelimScore(jia, tren, CallbackScore.No);

var leaders_scores = new Array<PrelimScore>;
leaders_scores = [ 
    score1, score2, score3, score4, score5, score6, score7, score8, score9, score10,
    score11, score12, score13, score14, score15, score16, score17, score18, score19, score20,
    score21, score22, score23, score24, score25, score26, score27, score28, score29, score30,
    score31, score32, score33, score34, score35, score36, score37, score38, score39, score40,
    score41, score42, score43, score44, score45, score46, score47, score48, score49, score50,
    score51, score52, score53, score54, score55
]

var followers_scores = new Array<PrelimScore>;
followers_scores = [ score56, score57, score58, score59, score60,
    score61, score62, score63, score64, score65, score66, score67, score68, score69, score70,
    score71, score72, score73, score74, score75, score76, score77, score78, score79, score80,
    score81, score82, score83, score84, score85, score86, score87, score88, score89, score90,
    score91, score92, score93, score94, score95, score96, score97, score98, score99, score100,
    score101, score102, score103, score104, score105
]

var leader_finalists = [
    brandon, stan, glen, jung, kaiano, edem
]

var follower_finalists = [
    jen, margie, alyssa, kristen_shaw, kristen, lara
]

var competitors = [
    brandon, stan, glen, jung, kaiano, edem, steve, alec, matt, david, keith,
    jen, margie, alyssa, kristen_shaw, kristen, lara, elli, tessa, kendra, jia
]

var prelimJudges = [
    arjay, erica, festa, markus, tren
]

var finalScore1 = new FinalScore(stan, lara, arjay, 1);
var finalScore2 = new FinalScore(stan, lara, flore, 1);
var finalScore3 = new FinalScore(stan, lara, festa, 1);
var finalScore4 = new FinalScore(stan, lara, markus, 3);
var finalScore5 = new FinalScore(stan, lara, tren, 5);

var finalScore6 = new FinalScore(glen, margie, arjay, 4);
var finalScore7 = new FinalScore(glen, margie, flore, 4);
var finalScore8 = new FinalScore(glen, margie, festa, 3);
var finalScore9 = new FinalScore(glen, margie, markus, 1);
var finalScore10 = new FinalScore(glen, margie, tren, 1);

var finalScore11 = new FinalScore(kaiano, kristen_shaw, arjay, 3);
var finalScore12 = new FinalScore(kaiano, kristen_shaw, flore, 3);
var finalScore13 = new FinalScore(kaiano, kristen_shaw, festa, 5);
var finalScore14 = new FinalScore(kaiano, kristen_shaw, markus, 6);
var finalScore15 = new FinalScore(kaiano, kristen_shaw, tren, 2);

var finalScore16 = new FinalScore(edem, kristen, arjay, 6);
var finalScore17 = new FinalScore(edem, kristen, flore, 2);
var finalScore18 = new FinalScore(edem, kristen, festa, 4);
var finalScore19 = new FinalScore(edem, kristen, markus, 2);
var finalScore20 = new FinalScore(edem, kristen, tren, 4);

var finalScore21 = new FinalScore(brandon, alyssa, arjay, 2);
var finalScore22 = new FinalScore(brandon, alyssa, flore, 6);
var finalScore23 = new FinalScore(brandon, alyssa, festa, 2);
var finalScore24 = new FinalScore(brandon, alyssa, markus, 4);
var finalScore25 = new FinalScore(brandon, alyssa, tren, 6);

var finalScore26 = new FinalScore(jung, jen, arjay, 5);
var finalScore27 = new FinalScore(jung, jen, flore, 5);
var finalScore28 = new FinalScore(jung, jen, festa, 6);
var finalScore29 = new FinalScore(jung, jen, markus, 5);
var finalScore30 = new FinalScore(jung, jen, tren, 3);

var finalScores = [
    [finalScore1, finalScore2, finalScore3, finalScore4, finalScore5],
    [finalScore6, finalScore7, finalScore8, finalScore9, finalScore10],
    [finalScore11, finalScore12, finalScore13, finalScore14, finalScore15],
    [finalScore16, finalScore17, finalScore18, finalScore19, finalScore20],
    [finalScore21, finalScore22, finalScore23, finalScore24, finalScore25],
    [finalScore26, finalScore27, finalScore28, finalScore29, finalScore30]
];

export class TestData {
    public static TestPrelimCompetitionLeaders() : PrelimCompetition {
        var comp = new PrelimCompetition(
            "Swungalow Bungalow",
            new Date(),
            Division.AllStar,
            Round.Prelims,
            Role.Leader
        );
        comp.AddScores(leaders_scores);
        comp.AddPromotedCompetitors(leader_finalists);

        return comp;
    }

    public static TestPrelimCompetitionFollowers() : PrelimCompetition {
        var comp = new PrelimCompetition(
            "Swungalow Bungalow",
            new Date(),
            Division.AllStar,
            Round.Prelims,
            Role.Follower
        );
        comp.AddScores(followers_scores);
        comp.AddPromotedCompetitors(follower_finalists);
        
        return comp;
    }

    public static TestFinalCompetition() : FinalCompetition {
        var comp = new FinalCompetition(
            "Swungalow Bungalow",
            new Date(),
            Division.AllStar
        );
        comp.SetScores(finalScores);
        
        return comp;
    }

    public static TestDanceEvent() : DanceEvent {
        var danceEvent = new DanceEvent(
            "Swungalow Bungalow",
            new Date()
        );
        danceEvent.PrelimCompetitions.push(this.TestPrelimCompetitionLeaders());
        danceEvent.PrelimCompetitions.push(this.TestPrelimCompetitionFollowers());
        danceEvent.FinalCompetitions.push(this.TestFinalCompetition());

        return danceEvent;
    }

    public static TestCompetitorsDb() : Array<Competitor> {
        return competitors;
    }

    public static TestJudgesDb() : Array<Judge>{
        return prelimJudges;
    }
}