import { CallbackScore } from "../classes/Enums";
import { Util } from "../classes/Util";

export default function CallbackScoreViewer(props: {callbackScore : CallbackScore}) {
    let col = 'red';

    switch (props.callbackScore) {
        case CallbackScore.Yes:
            col = '#34A56F';
            break;
        case CallbackScore.Alternate1:
            col = '#FFDF00';
            break;
        case CallbackScore.Alternate2:
            col = '#FBE7A1';
            break;
        case CallbackScore.Alternate3:
            col = '#FFFFC2';
            break;
        case CallbackScore.No:
            col = '#98AFC7';
            break;
        default:
        case CallbackScore.Unscored:
            col = 'red';
            break;
    }

    return (
        <button type="button" style={{backgroundColor: col}}>
            {Util.CallbackScoreShorthand(props.callbackScore)}
        </button>
    )
}