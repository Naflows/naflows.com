import React from 'react';
import PropTypes from 'prop-types';

const TimeLeft = ({ project }) => {
    if (project.end) {
        const now = new Date();
        const end = new Date(project.end);
        const diff = end - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        return (
            <div className="boxes-cube-big">
                <div className="box cube">
                    <div className="main">
                        {days}
                    </div>
                    <div className="sub-text">
                        jour{days > 1 ? 's' : ''}
                    </div>
                    <div className="text">
                        restant{days > 1 ? 's' : ''}
                    </div>
                </div>
            </div>
        )
    }
};

TimeLeft.propTypes = {
    project: PropTypes.object.isRequired,
};

export default TimeLeft;