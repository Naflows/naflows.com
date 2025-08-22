import React from "react";
import PropTypes from 'prop-types';
import '../../public/styles/modules/button.scss';

class Button extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={`app-button ${this.props.type}`} onClick={() => this.props.func()}>
                <div className="button-text">
                    {this.props.text}
                </div>
            </div>
        )
    }
}

Button.propTypes = {
    type : PropTypes.string.isRequired,
    text : PropTypes.string.isRequired,
    func : PropTypes.func.isRequired
}

export default Button;