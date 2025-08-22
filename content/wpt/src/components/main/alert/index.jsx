import Proptypes from 'prop-types';
import { v4 } from 'uuid';

import '../../../../public/styles/components/modules/alert.scss';
import Button from '../../modules/button';

import { useEffect, useRef } from 'react';

const Alert = ({
    title,
    message,
    className = '',
    buttons = [],
    additional_content = [],
    headerImageSrc = null,
    closeAtTop = false,
    closeFunction = () => {}
}) => {
    const appContentRef = useRef(null);

    useEffect(() => {
        const updateAppContentHeight = () => {
            const contentHeight = document.querySelector('#alertContent').offsetHeight;
            //appContentRef.current.style.marginTop = `${contentHeight-10}px`;
        };

        updateAppContentHeight();
        window.addEventListener('resize', updateAppContentHeight);

        return () => {
            window.removeEventListener('resize', updateAppContentHeight);
        };
    }, []);


    const id = v4();
    document.body.style.overflow = 'hidden';

    return (
        <div id={id} className="alert-box">
            <div className={`alert ${className} margin-center`}>
                <div className="content unselectable" style={{
                    display : !title && !message ? 'none' : 'flex'
                }} id={"alertContent"}>
                    {headerImageSrc && <img src={headerImageSrc} />}
                    <div className="header">
                        <div className="title">
                            {title}
                        </div>
                        <div className="message" style={{
                            display : !message ? 'none' : 'block'
                        }}>
                            {message}
                        </div>
                    </div>
                    {closeAtTop && (
                        <div onClick={() => {
                            closeFunction();
                        }} className="close icon-alone-display">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>
                        </div>
                    )}
                </div>
                <div className="body-container"
                    ref={appContentRef}
                >
                    {additional_content.length > 0 && (
                        <div
                            className="app-content"
                        >
                            {additional_content.map((content) => (content))}
                        </div>
                    )}
                </div>
                <div className="buttons-container" style = {{
                        display : buttons.length === 0 ? 'none' : 'flex'
                }}>
                        {
                            buttons.map((button, index) => {
                                if (button) {
                                    return (
                                        <Button
                                            key={index}
                                            text={button.text}
                                            onClick={button.onClick}
                                            className={button.className}
                                            style={button.style}
                                            parameters={button.parameters}
                                            escape={button.escape}
                                        />
                                    )
                                }
                            })
                        }
                    </div>
            </div>
        </div>
    )
};

Alert.propTypes = {
    title: Proptypes.string,
    message: Proptypes.string,
    className: Proptypes.string,
    buttons: Proptypes.array,
    additional_content: Proptypes.array,
    headerImageSrc : Proptypes.string,
    closeAtTop: Proptypes.bool,
    closeFunction: Proptypes.func
};

export default Alert;