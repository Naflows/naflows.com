import PropTypes from 'prop-types';
import '../../../../public/styles/components/modules/button.scss';
import { useEffect } from 'react';

const Button = ({
    text = '',
    onClick = () => {},
    className = '',
    style = {},
    parameters = {},
    icon = '',
    escape = true
}) => {



    return (
        <button 
            className={`button ${className} unselectable`} 
            style={style} 
            onClick={onClick}
            {...parameters}
            dangerouslySetInnerHTML={{__html: `
                ${icon ? `<div class="icon">${icon}</div>` : ''}
                ${text ? `<div class="text">${text}</div>` : ''}
            `}}

        ></button>
    )
};

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    parameters: PropTypes.object,
    icon: PropTypes.string,
    escape: PropTypes.bool
};

export default Button;
