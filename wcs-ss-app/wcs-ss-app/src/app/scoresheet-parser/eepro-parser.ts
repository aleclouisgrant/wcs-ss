import { Competition } from "@/classes/Competition";
import { Competitor } from "@/classes/Competitor";
import { FinalCompetition } from "@/classes/FinalCompetition";
import { FinalScore } from "@/classes/FinalScore";
import { Judge } from "@/classes/Judge";
import { PairedPrelimCompetition } from "@/classes/PairedPrelimCompetition";
import { PrelimCompetition } from "@/classes/PrelimCompetition";
import { PrelimScore } from "@/classes/PrelimScore";
import { Division, Role, Round, WcsUtil } from "wcs-ss-lib";

function IndexOfN(s: string, match: string, n: number) : number {
    var i = 1;
    var index = -1;

    while (i <= n && (index = s.indexOf(match, index + 1)) != -1) {
        if (i == n)
            return index;
        i++;
    }

    return -1;
}

function GetSubString(s: string, from: string, to: string) : string {
    if (s == null || s == "") {
        return "";
    }

    const fromIndex = s.indexOf(from) + from.length;
    const choppedString = s.substring(fromIndex, s.length - fromIndex);
    const toIndex = choppedString.indexOf(to) + fromIndex;

    var sub = "";
    sub = s.substring(fromIndex, toIndex - fromIndex);

    return sub;
}

function GetSubStringN(s: string, from: string, to: string, n: number) : string {
    const fromIndex = IndexOfN(s, from, n) + from.length;
    const toIndex = IndexOfN(s, to, n);
    
    var sub = "";
    sub = s.substring(fromIndex, toIndex - fromIndex);

    return sub;
}

export function ParseEEProPrelimScoreSheet(htmlString: string, searchDivision: Division) : Competition | undefined {
    var comp = new Competition();
    comp.Division = searchDivision;
    comp.PairedPrelimCompetitions.push(new PairedPrelimCompetition(Round.Prelims));

    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const tableElements = doc.getElementsByTagName("table");

    let date = new Date(Date.now());

    // skipping the first table
    for (let tableIndex = 1; tableIndex < tableElements.length; tableIndex++) {
        let tableElement = tableElements[tableIndex];
        const trElements = tableElement.getElementsByTagName("tr");
        
        let title = trElements[0].getElementsByTagName("td")[0].innerText;
        let division = WcsUtil.ContainsDivisionString(title);
        
        if (division != searchDivision)
            continue;
        
        let role = WcsUtil.ContainsRoleString(title);
        let round = WcsUtil.ContainsRoundString(title);
        let prelimComp = new PrelimCompetition(date, division, round, role);
        
        const tdElements = trElements[1].getElementsByTagName("td");

        // parsing prelim judges
        let judges = new Array<Judge>();
        for (let i = 2; i < tdElements.length; i++) {
            let tdElement = tdElements[i];

            if (tdElement.innerText == "BIB")
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
        prelimComp.Judges = judges;

        // parsing competitors and prelim scores
        for (let competitorIndex = 2; competitorIndex < trElements.length; competitorIndex++) {
            let trElement = trElements[competitorIndex];
            let nodes = trElement.getElementsByTagName("td");

            let name = nodes[1].innerText;
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

            const competitor = new Competitor(firstName, lastName, Number(nodes[2 + judges.length].innerText));
            prelimComp.Competitors.push(competitor);
            
            if (nodes[5 + judges.length].innerText == "X") {
                // if they have an X for promoted but nothing in the ALT column, they are a finalist
                if (nodes[6 + judges.length].innerText == "") {
                    prelimComp.AddPromotedCompetitor(competitor);
                }
                else if (nodes[6 + judges.length].innerText == "ALT1") {
                    prelimComp.Alternate1 = competitor;
                }
                else if (nodes[6 + judges.length].innerText == "ALT2") {
                    prelimComp.Alternate2 = competitor;
                }
            }

            let offset = 2;
            for (let scoreIndex = offset; scoreIndex < judges.length + offset; scoreIndex++) {
                let callbackScore = WcsUtil.StringToCallbackScore(nodes[scoreIndex].innerText);
                prelimComp.Scores.push(new PrelimScore(competitor, judges[scoreIndex - offset], callbackScore));
            }
        }

        if (role == Role.Leader)
            comp.PairedPrelimCompetitions[0].LeaderPrelimCompetition = prelimComp;
        else if (role == Role.Follower)
            comp.PairedPrelimCompetitions[0].FollowerPrelimCompetition = prelimComp;
    }

    return comp;
}

export function ParseEEProFinalScoreSheet(htmlString: string, searchDivision: Division) : Competition | undefined {
    var comp = new Competition();
    
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const tableElements = doc.getElementsByTagName("table");

    let date = new Date(Date.now());

    // skipping the first table
    for (let tableIndex = 1; tableIndex < tableElements.length; tableIndex++) {
        let tableElement = tableElements[tableIndex];
        const trElements = tableElement.getElementsByTagName("tr");
        
        let title = trElements[0].getElementsByTagName("td")[0].innerText;
        let division = WcsUtil.ContainsDivisionString(title);
        
        if (division != searchDivision)
            continue;
        
        comp.FinalCompetition = new FinalCompetition();
        
        const tdElements = trElements[1].getElementsByTagName("td");

        // parsing judges
        let judges = new Array<Judge>();
        for (let i = 2; i < tdElements.length; i++) {
            let tdElement = tdElements[i];

            if (tdElement.innerText == "BIB")
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
        for (let couplesIndex = 2; couplesIndex < trElements.length; couplesIndex++) {
            let trElement = trElements[couplesIndex];
            let nodes = trElement.getElementsByTagName("td");

            let placement = Number(nodes[0].innerText);
            let bibNumbers = nodes[2 + judges.length].innerText;

            let leaderName = nodes[1].innerText.substring(0, nodes[1].innerText.indexOf(" and "));
            let leaderPos = leaderName.indexOf(' ');
            let leaderFirstName = leaderName.substring(0, leaderPos).trim();
            let leaderLastName = leaderName.substring(leaderPos + 1).trim();
            let leaderBibNumber = bibNumbers.substring(0, bibNumbers.indexOf("/"));

            let leader = new Competitor(leaderFirstName, leaderLastName, Number(leaderBibNumber));
         
            let followerName = nodes[1].innerText.substring(nodes[1].innerText.indexOf(" and ") + " and ".length);
            let followerPos = followerName.indexOf(' ');
            let followerFirstName = followerName.substring(0, followerPos).trim();
            let followerLastName = followerName.substring(followerPos + 1).trim();
            let followerBibNumber = bibNumbers.substring(bibNumbers.indexOf("/" + 1))

            let follower = new Competitor(followerFirstName, followerLastName, Number(followerBibNumber));

            comp.FinalCompetition.Scores.push(new Array<FinalScore>);

            for (let scoreIndex = 2; scoreIndex < judges.length + 2; scoreIndex++) {
                let score = Number(nodes[scoreIndex].innerText);
                let finalScore = new FinalScore(leader, follower, judges[scoreIndex - 2], score);
                comp.FinalCompetition.Scores[placement - 1].push(finalScore);
            }
        }
    }
    return comp;
}