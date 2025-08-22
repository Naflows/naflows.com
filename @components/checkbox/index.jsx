import PropTypes from 'prop-types';
import '../../@styling/components/checkbox.scss';

const NaflowsCheckBox = ({
    label,
    checked,
    onUserChange,
    disabled,
    style
}) => {
    return (
        <div className={
            'naflows-checkbox' + (checked ? ' checked' : '') + (disabled ? ' disabled' : '')
        } onClick={() => {
            if (!disabled) {
                onUserChange(!checked);
            }
        }}>
            <div className="checker">
                <div className="check"></div>
            </div>
            <div className="content">
                {label}
            </div>
        </div>
    )
}

NaflowsCheckBox.propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    onUserChange: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.object
};

export default NaflowsCheckBox;