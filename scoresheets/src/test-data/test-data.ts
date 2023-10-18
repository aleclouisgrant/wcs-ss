import { PrelimCompetition } from '@/classes/Competition';
import { CallbackScore, Division, Role, Round } from '@/classes/Enums';
import { Competitor, Judge } from '@/classes/IPerson';
import { PrelimScore } from '@/classes/IScore';

var leader1 = new Competitor("Brandon", "Rasmussen", 301);
var leader2 = new Competitor("Stanislav", "Ivanov", 313);
var leader3 = new Competitor("Glen", "Acheampong", 735);
var leader4 = new Competitor("Jung", "Choe", 692);
var leader5 = new Competitor("Kaiano", "Levine", 690);
var leader6 = new Competitor("Edem", "Attikese", 775);
var leader7 = new Competitor("Steve", "Wilder", 330);
var leader8 = new Competitor("Alec", "Grant", 779);
var leader9 = new Competitor("Matt", "Davis", 707);
var leader10 = new Competitor("David", "Carrington", 316);
var leader11 = new Competitor("Keith", "Stremmel", 678);

var follower1 = new Competitor("Jen", "Ferreira", 308);
var follower2 = new Competitor("Margie", "Tuttle" , 647);
var follower3 = new Competitor("Alyssa", "Lundgren" , 791);
var follower4 = new Competitor("Kristen", "Shaw" , 633);
var follower5 = new Competitor("Kristen", "Wallace", 769);
var follower6 = new Competitor("Lara", "Deni", 688);
var follower7 = new Competitor("Elli", "Warner", 310);
var follower8 = new Competitor("Tessa", "Antolini", 628);
var follower9 = new Competitor("Kendra", "Zara", 746);
var follower10 = new Competitor("Jia", "Liu", 669);

var judge1 = new Judge("Arjay", "Centeno");
var judge2 = new Judge("Erica", "Smith");
var judge3 = new Judge("John", "Festa");
var judge4 = new Judge("Markus", "Smith");
var judge5 = new Judge("Tren", "Veal");

var score1 = new PrelimScore(leader1, judge1, CallbackScore.Yes);
var score2 = new PrelimScore(leader1, judge2, CallbackScore.Yes);
var score3 = new PrelimScore(leader1, judge3, CallbackScore.Yes);
var score4 = new PrelimScore(leader1, judge4, CallbackScore.Yes);
var score5 = new PrelimScore(leader1, judge5, CallbackScore.Yes);

var score6 = new PrelimScore(leader2, judge1, CallbackScore.Yes);
var score7 = new PrelimScore(leader2, judge2, CallbackScore.Yes);
var score8 = new PrelimScore(leader2, judge3, CallbackScore.Yes);
var score9 = new PrelimScore(leader2, judge4, CallbackScore.Yes);
var score10 = new PrelimScore(leader2, judge5, CallbackScore.Yes);

var score11 = new PrelimScore(leader3, judge1, CallbackScore.Yes);
var score12 = new PrelimScore(leader3, judge2, CallbackScore.Yes);
var score13 = new PrelimScore(leader3, judge3, CallbackScore.Yes);
var score14 = new PrelimScore(leader3, judge4, CallbackScore.Yes);
var score15 = new PrelimScore(leader3, judge5, CallbackScore.Yes);

var score16 = new PrelimScore(leader4, judge1, CallbackScore.Yes);
var score17 = new PrelimScore(leader4, judge2, CallbackScore.Alternate2);
var score18 = new PrelimScore(leader4, judge3, CallbackScore.Yes);
var score19 = new PrelimScore(leader4, judge4, CallbackScore.Yes);
var score20 = new PrelimScore(leader4, judge5, CallbackScore.Yes);

var score21 = new PrelimScore(leader5, judge1, CallbackScore.Yes);
var score22 = new PrelimScore(leader5, judge2, CallbackScore.Yes);
var score23 = new PrelimScore(leader5, judge3, CallbackScore.Alternate3);
var score24 = new PrelimScore(leader5, judge4, CallbackScore.No);
var score25 = new PrelimScore(leader5, judge5, CallbackScore.Yes);

var score26 = new PrelimScore(leader6, judge1, CallbackScore.Alternate1);
var score27 = new PrelimScore(leader6, judge2, CallbackScore.No);
var score28 = new PrelimScore(leader6, judge3, CallbackScore.Yes);
var score29 = new PrelimScore(leader6, judge4, CallbackScore.Yes);
var score30 = new PrelimScore(leader6, judge5, CallbackScore.Alternate2);

var score31 = new PrelimScore(leader7, judge1, CallbackScore.Alternate3);
var score32 = new PrelimScore(leader7, judge2, CallbackScore.Yes);
var score33 = new PrelimScore(leader7, judge3, CallbackScore.Alternate2);
var score34 = new PrelimScore(leader7, judge4, CallbackScore.Alternate2);
var score35 = new PrelimScore(leader7, judge5, CallbackScore.Alternate1);

var score36 = new PrelimScore(leader8, judge1, CallbackScore.Alternate2);
var score37 = new PrelimScore(leader8, judge2, CallbackScore.Alternate3);
var score38 = new PrelimScore(leader8, judge3, CallbackScore.Alternate1);
var score39 = new PrelimScore(leader8, judge4, CallbackScore.Alternate1);
var score40 = new PrelimScore(leader8, judge5, CallbackScore.Alternate3);

var score41 = new PrelimScore(leader9, judge1, CallbackScore.No);
var score42 = new PrelimScore(leader9, judge2, CallbackScore.Alternate1);
var score43 = new PrelimScore(leader9, judge3, CallbackScore.No);
var score44 = new PrelimScore(leader9, judge4, CallbackScore.No);
var score45 = new PrelimScore(leader9, judge5, CallbackScore.No);

var score46 = new PrelimScore(leader10, judge1, CallbackScore.No);
var score47 = new PrelimScore(leader10, judge2, CallbackScore.No);
var score48 = new PrelimScore(leader10, judge3, CallbackScore.No);
var score49 = new PrelimScore(leader10, judge4, CallbackScore.Alternate3);
var score50 = new PrelimScore(leader10, judge5, CallbackScore.No);

var score51 = new PrelimScore(leader11, judge1, CallbackScore.No);
var score52 = new PrelimScore(leader11, judge2, CallbackScore.No);
var score53 = new PrelimScore(leader11, judge3, CallbackScore.No);
var score54 = new PrelimScore(leader11, judge4, CallbackScore.No);
var score55 = new PrelimScore(leader11, judge5, CallbackScore.No);


var score56 = new PrelimScore(follower1, judge1, CallbackScore.Yes);
var score57 = new PrelimScore(follower1, judge2, CallbackScore.Yes);
var score58 = new PrelimScore(follower1, judge3, CallbackScore.Yes);
var score59 = new PrelimScore(follower1, judge4, CallbackScore.Yes);
var score60 = new PrelimScore(follower1, judge5, CallbackScore.Yes);

var score61 = new PrelimScore(follower2, judge1, CallbackScore.Yes);
var score62 = new PrelimScore(follower2, judge2, CallbackScore.Yes);
var score63 = new PrelimScore(follower2, judge3, CallbackScore.Yes);
var score64 = new PrelimScore(follower2, judge4, CallbackScore.Yes);
var score65 = new PrelimScore(follower2, judge5, CallbackScore.Yes);

var score66 = new PrelimScore(follower3, judge1, CallbackScore.Alternate1);
var score67 = new PrelimScore(follower3, judge2, CallbackScore.Yes);
var score68 = new PrelimScore(follower3, judge3, CallbackScore.Yes);
var score69 = new PrelimScore(follower3, judge4, CallbackScore.Yes);
var score70 = new PrelimScore(follower3, judge5, CallbackScore.Yes);

var score71 = new PrelimScore(follower4, judge1, CallbackScore.Yes);
var score72 = new PrelimScore(follower4, judge2, CallbackScore.Alternate2);
var score73 = new PrelimScore(follower4, judge3, CallbackScore.Alternate2);
var score74 = new PrelimScore(follower4, judge4, CallbackScore.Yes);
var score75 = new PrelimScore(follower4, judge5, CallbackScore.Yes);

var score76 = new PrelimScore(follower5, judge1, CallbackScore.Yes);
var score77 = new PrelimScore(follower5, judge2, CallbackScore.Yes);
var score78 = new PrelimScore(follower5, judge3, CallbackScore.Yes);
var score79 = new PrelimScore(follower5, judge4, CallbackScore.Alternate2);
var score80 = new PrelimScore(follower5, judge5, CallbackScore.Alternate3);

var score81 = new PrelimScore(follower6, judge1, CallbackScore.Alternate2);
var score82 = new PrelimScore(follower6, judge2, CallbackScore.Yes);
var score83 = new PrelimScore(follower6, judge3, CallbackScore.No);
var score84 = new PrelimScore(follower6, judge4, CallbackScore.Yes);
var score85 = new PrelimScore(follower6, judge5, CallbackScore.Yes);

var score86 = new PrelimScore(follower7, judge1, CallbackScore.Yes);
var score87 = new PrelimScore(follower7, judge2, CallbackScore.No);
var score88 = new PrelimScore(follower7, judge3, CallbackScore.Yes);
var score89 = new PrelimScore(follower7, judge4, CallbackScore.No);
var score90 = new PrelimScore(follower7, judge5, CallbackScore.Alternate1);

var score91 = new PrelimScore(follower8, judge1, CallbackScore.No);
var score92 = new PrelimScore(follower8, judge2, CallbackScore.Alternate1);
var score93 = new PrelimScore(follower8, judge3, CallbackScore.No);
var score94 = new PrelimScore(follower8, judge4, CallbackScore.Alternate3);
var score95 = new PrelimScore(follower8, judge5, CallbackScore.Alternate2);

var score96 = new PrelimScore(follower9, judge1, CallbackScore.Alternate3);
var score97 = new PrelimScore(follower9, judge2, CallbackScore.Alternate3);
var score98 = new PrelimScore(follower9, judge3, CallbackScore.Alternate3);
var score99 = new PrelimScore(follower9, judge4, CallbackScore.No);
var score100 = new PrelimScore(follower9, judge5, CallbackScore.No);

var score101 = new PrelimScore(follower10, judge1, CallbackScore.No);
var score102 = new PrelimScore(follower10, judge2, CallbackScore.No);
var score103 = new PrelimScore(follower10, judge3, CallbackScore.Alternate1);
var score104 = new PrelimScore(follower10, judge4, CallbackScore.Alternate1);
var score105 = new PrelimScore(follower10, judge5, CallbackScore.No);

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
    leader1, leader2, leader3, leader4, leader5, leader6
]

var follower_finalists = [
    follower1, follower2, follower3, follower4, follower5, follower6
]

var competitors = [
    leader1, leader2, leader3, leader4, leader5, leader6, leader7, leader8, leader9, leader10, leader11,
    follower1, follower2, follower3, follower4, follower5, follower6, follower7, follower8, follower9, follower10
]

var judges = [
    judge1, judge2, judge3, judge4, judge5
]

export class TestData {
    public static TestPrelimCompetitionLeaders() : PrelimCompetition{
        var comp = new PrelimCompetition(
            "Swungalow Bungalow",
            Division.AllStar,
            Round.Prelims,
            Role.Leader
        );
        comp.AddScores(leaders_scores);
        comp.AddPromotedCompetitors(leader_finalists);

        return comp;
    }

    public static TestPrelimCompetitionFollowers() : PrelimCompetition{
        var comp = new PrelimCompetition(
            "Swungalow Bungalow",
            Division.AllStar,
            Round.Prelims,
            Role.Follower
        );
        comp.AddScores(followers_scores);
        comp.AddPromotedCompetitors(follower_finalists);
        
        return comp;
    }

    public static TestCompetitorsDb() : Array<Competitor> {
        return competitors;
    }

    public static TestJudgesDb() : Array<Judge>{
        return judges;
    }
}