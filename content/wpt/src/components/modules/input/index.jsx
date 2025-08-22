import PropTypes from 'prop-types';

import '../../../../public/styles/components/modules/input.scss';

const Input = ({
    type = 'text',
    placeholder = '',
    value = '',
    onChange = () => {},
    className = '',
    style = {},
    parameters = {}
}) => {
    if (className != "textarea") {
        return (
            <input
                type={type}
                placeholder={placeholder}
                defaultValue={value}
                onChange={onChange}
                className={`input ${className}`}
                style={style}
                {...parameters}
            />
        )
    } else {
        return (
            <textarea
                placeholder={placeholder}
                defaultValue={value}
                onChange={onChange}
                className={`input ${className}`}
                style={style}
                {...parameters}
            />
        )
    }
}

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    parameters: PropTypes.object
};

export default Input;