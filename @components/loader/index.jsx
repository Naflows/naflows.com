import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import NaflowsPopup from '../popup';

const NaflowsLoader = ({
    message,
    displayLoader
}) => {

    const [
        timedOut,
        setTimedOut
    ] = useState(false);

    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        if (displayLoader) {
            const id = setTimeout(() => {
                setTimedOut(true);
            }, 5000);
            setTimeoutId(id);
        } else {
            setTimedOut(false);
            if (timeoutId) {
                clearTimeout(timeoutId);
                setTimeoutId(null);
            }
        }
    }, [displayLoader]);
    
    return (
        <div className="naflows-loader-parent">
            {
                !timedOut ? (
                    <>
                        <div className="message" dangerouslySetInnerHTML={{
                            __html: message
                        }}></div>
                        <div className="naflows-loader">
                            <div className="bar"></div>
                        </div>
                    </>
                ) : (
                    <NaflowsPopup
                        title='Timeout'
                        content='The request took too long to complete. Please try again. If the problem persists, contact the administrator.'
                        type='warning'
                    />
                )
            }
        </div>
    );
};

NaflowsLoader.propTypes = {
    message: PropTypes.string
};


export default NaflowsLoader;