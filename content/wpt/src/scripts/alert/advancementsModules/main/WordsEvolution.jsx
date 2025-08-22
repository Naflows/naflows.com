import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../components/modules/button';

const WordsEvolution = ({ 
    canvasWordsHoverValues,
    setCanvasWordsType,
    canvasWordsType
 }) => {
    return (
        <div key={3} className="canvas">
            <div className="canvas-type-picker">
                <Button
                    onClick={() => setCanvasWordsType("bars")}
                    className={
                        `${(canvasWordsType === "bars" ? "primary" : "secondary hover-darker")}`
                    }
                    text="Barres"
                />
                <Button
                    onClick={() => setCanvasWordsType("area")}
                    className={
                        `${(canvasWordsType === "area" ? "primary" : "secondary hover-darker")}`
                    }
                    text="Zones"
                />
                <Button
                    onClick={() => setCanvasWordsType("points")}
                    className={
                        `${(canvasWordsType === "points" ? "primary" : "secondary hover-darker")}`
                    }
                    text="Points"
                />
            </div>
            <div className="canvas-container">
                <div className="canvas-informations">
                    <div className="chart-title">
                        Progression des mots
                    </div>
                </div>
                <canvas
                    id="words_chart_advancements"
                    width="800"
                    height="400"
                    style={{
                        width: "800px",
                        height: "400px"
                    }}
                ></canvas>
                {canvasWordsHoverValues && canvasWordsHoverValues.words && canvasWordsHoverValues.x && canvasWordsHoverValues.y && canvasWordsHoverValues.index ? (
                    <div className="canvas-hover" style={{
                        left: canvasWordsHoverValues.x,
                        top: canvasWordsHoverValues.y
                    }}>
                        <div className="session">
                            Scéance {canvasWordsHoverValues.index}
                        </div>
                        <div className="date">
                            {canvasWordsHoverValues.date.replace(/-/g, "/")}
                        </div>
                        <div className="words">
                            <div className="added">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                                {canvasWordsHoverValues.words} mot{canvasWordsHoverValues.words > 1 ? "s" : ""}
                            </div>
                            <div className="growth">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z"/></svg>
                                {canvasWordsHoverValues.ratio > 0 ? (
                                    "+" + canvasWordsHoverValues.ratio
                                ): (
                                    canvasWordsHoverValues.ratio
                                )}%
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

WordsEvolution.propTypes = {
    canvasWordsHoverValues: PropTypes.shape({
        words: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number,
        index: PropTypes.number,
        date: PropTypes.string,
        ratio: PropTypes.number
    }),
    setCanvasWordsType: PropTypes.func.isRequired,
    canvasWordsType : PropTypes.string.isRequired
};

export default WordsEvolution;