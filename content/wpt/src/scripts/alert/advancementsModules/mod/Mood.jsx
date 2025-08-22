import PropTypes from 'prop-types';
import moods from '../../../modules/moods';

const Mood = ({ mood }) => {
    if (mood >= 0) {
        return (
            <div className="box display-row" id="moods">
                <div className="main">
                    {moods[Object.keys(moods)[mood]]}
                </div>
                <div className="text">
                    Vous avez été {Object.keys(moods)[mood].toLowerCase()} la plupart du temps
                </div>
            </div>
        )
    }
};

Mood.propTypes = {
    mood: PropTypes.string.isRequired,
};

export default Mood;