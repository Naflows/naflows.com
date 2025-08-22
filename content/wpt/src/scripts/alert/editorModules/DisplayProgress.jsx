import React from 'react';
import PropTypes from 'prop-types';

const DisplayProgress = ({ max, progress }) => {
    console.log(
        progress,
        max
    )
    return (
        <div className="bar">
            <span>
                {progress} / {max}
            </span>
            <div className="progress" style={{
                width : `${(progress / max) * 100}%`
            }}></div>
        </div>
    );
};

DisplayProgress.propTypes = {
    progress: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
};

export default DisplayProgress;