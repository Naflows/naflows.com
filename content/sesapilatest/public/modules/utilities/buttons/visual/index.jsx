import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import '../../../../styling/root/index.css'

const buttonsExceptions = ['filled','textual','unfilled','icon','blank'];

const renderContent = (container) => {
    return Object.keys(container).map((key) => {
      if (key === 'text') {
        return (
          <div key={key} className="button-text">
            {container[key]}
          </div>
        );
      } else if (key === 'svg') {
        return (
          <div key={key} className="button-icon">
            {container[key]}
          </div>
        );
      } else {
        return null;
      }
    });
  };

const AppButton = ( { type, container , action, custom_properties = [] } ) => {
    if (!buttonsExceptions.includes(type)) throw new Error("Unexpected argument: 'type' property is invalid.")
    if (!container.text && !container.svg) throw new Error("Unexpected argument: 'container' is empty.");
    if (!action) console.warn('Warning: empty button function is unnecessary.')

    const stackCustomProperties = (properties) => {
        return properties.join(' ');
    }

    return (
        <div className={
            `button ${type} ${container.svg && !container.text ? 'contains-svg-only' : ''} ${custom_properties.length > 0 ? stackCustomProperties(custom_properties) : ''}`
        } onClick={action}>
            {renderContent(container)}
        </div>
      );
}

AppButton.propTypes = {
    type :                      PropTypes.string.isRequired,
    container :                 PropTypes.object.isRequired,
    custom_properties :         PropTypes.array,
    action :                    PropTypes.func,
};
  
export default AppButton;