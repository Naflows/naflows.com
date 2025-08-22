import PropTypes from 'prop-types';
import './index.css';
import { useState } from 'react';

const Switch = ( { boxName, boxDescription , states , additional_components = []} ) => {
    const [ state, setState ] = useState(states.default);
    
    
    return (
        <div className={"switch" + " " + ( state ? 'on' : 'off') + " " + additional_components.map((i) => { return i })}>
            <div className={"switcher"} onClick={() => {
                setState(!state);
                if (state == false) {
                    states.on();
                } else {
                    states.off();
                }
            }}>
                <div className="button"></div>
            </div>
            <div className="text">
                <div className="name">
                    {boxName}
                </div>
                {boxDescription ? (
                    <div className="description">
                        {boxDescription}
                    </div>
                ) : null}
            </div>
        </div>
    )
};


Switch.propTypes = {
    boxName : PropTypes.string.isRequired,
    boxDescription : PropTypes.string,
    states : PropTypes.object.isRequired,
    additional_components : PropTypes.array
};
export default Switch;