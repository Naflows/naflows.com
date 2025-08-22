import PropTypes from 'prop-types';
import MissingWords from '../mod/MissingWords';
import SessionsNumber from '../mod/SessionsNumber';
import Mood from '../mod/Mood';
import TimeLeft from '../mod/TimeLeft';

const MainInformations = ({ mostFeltMood, sessions, project }) => {
    return (
        <div key={1} className="field">
            <div className="canvas-container">
                <div className="main-stats">
                    <div className="canvas display-column">
                        <div className="canvas-container">
                            <canvas id="words_advancements" width="200" height="200"></canvas>
                            <div className="canvas-informations">
                                <div className="legends">
                                    <div className="legend">
                                        <div
                                            className="color"
                                            style={{
                                                backgroundColor: getComputedStyle(document.body).getPropertyValue("--app-second-hue")
                                            }}
                                        ></div>
                                        <div className="name">Mots écrits</div>
                                    </div>
                                    <div className="legend">
                                        <div
                                            className="color"
                                            style={{
                                                backgroundColor: getComputedStyle(document.body).getPropertyValue("--app-main-hue")
                                            }}
                                        ></div>
                                        <div className="name">Mots restants</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="display-column">
                            <Mood mood={mostFeltMood} />
                        </div>
                    </div>
                    <div className="info-boxes display-column">
                        <div className="display-row">
                            <SessionsNumber sessions={sessions} />
                            <MissingWords words={project.stats.total} length={project.length} />
                            <TimeLeft project={project} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

MainInformations.propTypes = {
    mostFeltMood: PropTypes.number.isRequired,
    sessions: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired
};

export default MainInformations;