import PropTypes from 'prop-types';

const SessionsNumber = ({ sessions }) => {
    if (sessions) {
        const ratio = Math.round(sessions.ratio);

        return (
            <div className="boxes-cube-big">
                <div className="box cube">
                    <div className="main">
                        {isNaN(ratio) ? 0 : ratio}
                    </div>
                    <div className="text">
                        mot{ratio > 1 ? "s":""} par scéance
                    </div>
                </div>
                <div className="box cube">
                    <div className="main">
                        {sessions.number}
                    </div>
                    <div className="text">
                    scéance{sessions.number>1?"s":""}
                    </div>
                </div>
            </div>
        )
    }
};

SessionsNumber.propTypes = {
    sessions: PropTypes.object.isRequired,
};

export default SessionsNumber;