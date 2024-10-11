'use client';

import { CallbackScore } from "wcs-ss-lib";
import { WcsUtil } from "wcs-ss-lib";

export default function CallbackScoreViewer(props: {callbackScore : CallbackScore}) {
    let col = 'red';

    switch (props.callbackScore) {
        case CallbackScore.Yes:
            col = '#6ABF73';
            break;
        case CallbackScore.Alternate1:
            col = '#FFD600';
            break;
        case CallbackScore.Alternate2:
            col = '#FFE767';
            break;
        case CallbackScore.Alternate3:
            col = '#FEF395';
            break;
        case CallbackScore.No:
            col = '#CFCDCD';
            break;
        default:
        case CallbackScore.Unscored:
            col = 'red';
            break;
    }

    return (
        <div className="flex justify-center items-center" style={{backgroundColor: col, width: 35, height: 22, fontSize: 10, fontWeight: 700, color: "white", borderRadius: 10}}>
            {WcsUtil.GetCallbackScoreShorthand(props.callbackScore)}
        </div>
    )
}