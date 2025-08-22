import PropTypes from "prop-types";
import { useState } from "react";

const StopTimes = ({s,a,headID, headLine}) => {
    const [lineView, setLineView] = useState("");
    return (
        <div className={`line-head ${lineView == headID ? "view" : ""}`} id={headID}>
                <div className="line-drop" onClick={() => {
                    if (lineView !== (headID)) {
                        setLineView(headID);
                    } else {
                        setLineView("");
                    }
                }}>
                <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21.66" height="86.6398" rx="10.83" transform="matrix(-0.707107 -0.707107 0.65872 -0.752388 43.1223 128.714)" fill="#D9D9D9"/>
                    <rect width="21.66" height="86.6398" rx="10.83" transform="matrix(0.707107 -0.707107 0.65872 0.752388 27.8063 14.6021)" fill="#D9D9D9"/>
                </svg>
                <span>De <b>{s}</b> à <b>{a}</b></span>

            </div>
            <div className={`content`}>
                {headLine.map((i) => i)}
            </div>
        </div>
    )
}

StopTimes.propTypes = {
    s: PropTypes.string.isRequired,
    a: PropTypes.string.isRequired,
    headID: PropTypes.string.isRequired,
    headLine : PropTypes.array.isRequired

};


export default StopTimes;