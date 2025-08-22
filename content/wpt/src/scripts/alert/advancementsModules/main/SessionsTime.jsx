import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../components/modules/button';

const SessionsTime = ({ 
    canvasTimesHoverValues,
    setCanvasTimesType,
    canvasTimesType
    
 }) => {
    return (
        <div className="canvas" key={2}>
            <div className="canvas-type-picker">
                <Button
                    onClick={() => setCanvasTimesType("bars")}
                    className={
                        `${(canvasTimesType === "bars" ? "primary" : "secondary hover-darker")}`
                    }
                    text="Barres"
                />
                <Button
                    onClick={() => setCanvasTimesType("area")}
                    className={
                        `${(canvasTimesType === "area" ? "primary" : "secondary hover-darker")}`
                    }
                    text="Zones"
                />
                <Button
                    onClick={() => setCanvasTimesType("points")}
                    className={
                        `${(canvasTimesType === "points" ? "primary" : "secondary hover-darker")}`
                    }
                    text="Points"
                />
            </div>
            <div className="canvas-container">
                <div className="canvas-informations">
                    <div className="chart-title">
                        Longueur des sessions
                    </div>
                </div>
                <canvas id="sessions_time" width="800" height="400" style={{
                    width: "800px",
                    height: "400px"
                }}></canvas>
                {canvasTimesHoverValues && canvasTimesHoverValues.hours && canvasTimesHoverValues.words && canvasTimesHoverValues.wordsAmount && canvasTimesHoverValues.x && canvasTimesHoverValues.y && canvasTimesHoverValues.index && canvasTimesHoverValues.minutes ? (
                    <div className="canvas-hover" style={{
                        left: canvasTimesHoverValues.x,
                        top: canvasTimesHoverValues.y
                    }}>
                        <div className="session">
                            Scéance {canvasTimesHoverValues.index}
                        </div>
                        <div className="hours">
                            {canvasTimesHoverValues.hours}h{canvasTimesHoverValues.minutes}
                        </div>
                        <div className="words">
                            <div className="added">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                                {canvasTimesHoverValues.words} mot{canvasTimesHoverValues.words > 1 ? "s" : ""}
                            </div>
                            <div className="growth">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z"/></svg>
                                {canvasTimesHoverValues.wordsAmount}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

SessionsTime.propTypes = {
    canvasTimesHoverValues: PropTypes.shape({
        hours: PropTypes.number,
        words: PropTypes.number,
        wordsAmount: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number,
        index: PropTypes.number,
        minutes: PropTypes.number
    }),
    setCanvasTimesType: PropTypes.func.isRequired,
    canvasTimesType: PropTypes.string.isRequired
};

export default SessionsTime;