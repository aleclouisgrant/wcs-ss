import { Competition } from "@/classes/Competition";
import { Competitor } from "@/classes/Competitor";
import { FinalCompetition } from "@/classes/FinalCompetition";
import { FinalScore } from "@/classes/FinalScore";
import { Judge } from "@/classes/Judge";
import { PairedPrelimCompetition } from "@/classes/PairedPrelimCompetition";
import { PrelimCompetition } from "@/classes/PrelimCompetition";
import { PrelimScore } from "@/classes/PrelimScore";
import { Division, Role, Round, WcsUtil } from "wcs-ss-lib";

export function ParseWorldDanceRegistryPrelimScoreSheet(htmlString: string, searchDivision: Division) : Competition | undefined {
    var comp = new Competition();
    comp.Division = searchDivision;
    comp.PairedPrelimCompetitions.push(new PairedPrelimCompetition(Round.Prelims));

    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const titleElements = doc.getElementsByTagName("h3");
    let title = titleElements[0].innerText;

    if (!WcsUtil.ContainsDivisionString(title))
        return comp;

    let round : Round;
    if (title.includes("Prelim Round 1")) {
        round = Round.Prelims;
    }
    else if (title.includes("Prelim Round 2")) { //this isn't foolproof
        round = Round.Semifinals;
    }
    else {
        return comp;
    }

    const tableElements = doc.getElementsByTagName("table");

    let date = new Date(Date.now());
    var leaderPrelimComp = new PrelimCompetition(date, searchDivision, round, Role.Leader);
    var followerPrelimComp = new PrelimCompetition(date, searchDivision, round, Role.Follower);

    // columns go: Callback, Count, Bib #, Name, [judges], Scores Sum
    
    const leaderRows = tableElements[0].getElementsByTagName("tr");
    //leader judges
    const leaderJudgeElements = leaderRows[0].getElementsByTagName("td");
    var leaderJudges = new Array<Judge>();
    for (let judgeIndex = 4; judgeIndex < leaderJudgeElements.length; judgeIndex++) {
        let name = leaderJudgeElements[judgeIndex].innerText;
        if (name == "Scores Sum")
            break;

        let position = name.trim().indexOf(' ');

        if (position == -1) { //no last name present
            leaderJudges.push(new Judge(name.trim(), ''));
        }
        else {
            leaderJudges.push(new Judge(name.trim().substring(0, position), name.trim().substring(position + 1)));
        }
    }
    leaderPrelimComp.Judges = leaderJudges;

    // leaders' scores
    for (let competitorIndex = 1; competitorIndex < leaderRows.length; competitorIndex++) {        
        let competitorElement = leaderRows[competitorIndex];
        const nodes = competitorElement.getElementsByTagName("td");

        let name = nodes[3].innerText;
        let pos = name.indexOf(' ');
        let firstName = "";
        let lastName = "";

        if (pos == -1) {
            firstName = name;
        }
        else {
            firstName = name.substring(0, pos).trim();
            lastName = name.substring(pos + 1).trim();
        }

        const competitor = new Competitor(firstName, lastName, Number(nodes[2].innerText));
        leaderPrelimComp.Competitors.push(competitor);

        if (nodes[0].innerText == "Y") {
            leaderPrelimComp.AddPromotedCompetitor(competitor);
        } 
        else if (nodes[0].innerText == "A1") {
            leaderPrelimComp.Alternate1 = competitor;
        }
        else if (nodes[0].innerText == "A2") {
            leaderPrelimComp.Alternate2 = competitor;
        }

        const offset = 4;
        for (let scoreIndex = 0; scoreIndex < leaderJudges.length; scoreIndex++) {
            var callbackScore = WcsUtil.NumberToCallbackScore(Number(nodes[scoreIndex + offset].innerText));
            
            var prelimScore = new PrelimScore(competitor, leaderJudges[scoreIndex], callbackScore);
            leaderPrelimComp.Scores.push(prelimScore);
        }
    }

    const followerRows = tableElements[1].getElementsByTagName("tr");
    // follower judges
    const followerJudgeElements = followerRows[0].getElementsByTagName("td");
    var followerJudges = new Array<Judge>();
    for (let judgeIndex = 4; judgeIndex < followerJudgeElements.length; judgeIndex++) {
        let name = followerJudgeElements[judgeIndex].innerText;
        if (name == "Scores Sum")
            break;

        let position = name.trim().indexOf(' ');

        if (position == -1) { //no last name present
            followerJudges.push(new Judge(name.trim(), ''));
        }
        else {
            followerJudges.push(new Judge(name.trim().substring(0, position), name.trim().substring(position + 1)));
        }
    }
    followerPrelimComp.Judges = followerJudges;

    // followers' scores
    for (let competitorIndex = 1; competitorIndex < followerRows.length; competitorIndex++) {
        let competitorElement = followerRows[competitorIndex];
        const nodes = competitorElement.getElementsByTagName("td");

        let name = nodes[3].innerText;
        let pos = name.indexOf(' ');
        let firstName = "";
        let lastName = "";

        if (pos == -1) {
            firstName = name;
        }
        else {
            firstName = name.substring(0, pos).trim();
            lastName = name.substring(pos + 1).trim();
        }

        const competitor = new Competitor(firstName, lastName, Number(nodes[2].innerText));
        followerPrelimComp.Competitors.push(competitor);

        if (nodes[0].innerText == "Y") {
            followerPrelimComp.AddPromotedCompetitor(competitor);
        } 
        else if (nodes[0].innerText == "A1") {
            followerPrelimComp.Alternate1 = competitor;
        }
        else if (nodes[0].innerText == "A2") {
            followerPrelimComp.Alternate2 = competitor;
        }

        const offset = 4;
        for (let scoreIndex = 0; scoreIndex < followerJudges.length; scoreIndex++) {
            var callbackScore = WcsUtil.NumberToCallbackScore(Number(nodes[scoreIndex + offset].innerText));
            
            var prelimScore = new PrelimScore(competitor, followerJudges[scoreIndex], callbackScore);
            followerPrelimComp.Scores.push(prelimScore);
        }
    }

    comp.PairedPrelimCompetitions[0].LeaderPrelimCompetition = leaderPrelimComp;
    comp.PairedPrelimCompetitions[0].FollowerPrelimCompetition = followerPrelimComp;

    return comp;
}

export function ParseWorldDanceRegistryFinalScoreSheet(htmlString: string, searchDivision: Division) : Competition | undefined {
    var comp = new Competition();
    
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const titleElements = doc.getElementsByTagName("h3");
    let title = titleElements[0].innerText;

    if (!WcsUtil.ContainsDivisionString(title))
        return comp;

    let division = WcsUtil.ContainsDivisionString(title);
    if (division != searchDivision)
        return comp;
    
    let date = new Date(Date.now());
    comp.FinalCompetition = new FinalCompetition(date, searchDivision);

    const tableElement = doc.getElementsByTagName("table")[0];
    const trElements = tableElement.getElementsByTagName("tr");
    
    // columns go: Bib #, Leader, Follower, Final Placement, [judges], [relative placement grid]
    
    // parsing judges
    const tdElements = trElements[0].getElementsByTagName("td");
    let judges = new Array<Judge>();
    for (let i = 4; i < tdElements.length; i++) {
        let tdElement = tdElements[i];

        if (tdElement.innerText == "1--1")
            break;

        let name = tdElement.innerText;
        let position = name.trim().indexOf(' ');

        if (position == -1) { //no last name present
            judges.push(new Judge(name.trim(), ''));
        }
        else {
            judges.push(new Judge(name.trim().substring(0, position), name.trim().substring(position + 1)));
        }
    }
    comp.FinalCompetition.Judges = judges;

    // parsing couples' scores
    for (let couplesIndex = 1; couplesIndex < trElements.length; couplesIndex++) {
        let trElement = trElements[couplesIndex];
        let nodes = trElement.getElementsByTagName("td");

        let placement = Number(nodes[3].innerText);

        let leaderName = nodes[1].innerText;
        let leaderPos = leaderName.indexOf(' ');
        let leaderFirstName = leaderName.substring(0, leaderPos).trim();
        let leaderLastName = leaderName.substring(leaderPos + 1).trim();

        let leader = new Competitor(leaderFirstName, leaderLastName, Number(nodes[0].innerText));
        
        let followerName = nodes[2].innerText;
        let followerPos = followerName.indexOf(' ');
        let followerFirstName = followerName.substring(0, followerPos).trim();
        let followerLastName = followerName.substring(followerPos + 1).trim();

        let follower = new Competitor(followerFirstName, followerLastName);

        comp.FinalCompetition.Scores[placement - 1] = new Array<FinalScore>();

        let offset = 3;
        for (let scoreIndex = offset; scoreIndex < judges.length + offset; scoreIndex++) {
            let score = Number(nodes[scoreIndex].innerText);
            let finalScore = new FinalScore(leader, follower, judges[scoreIndex - offset], score);
            comp.FinalCompetition.Scores[placement - 1].push(finalScore);
        }
    }

    return comp;
}