import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ControlCommon from './control-common';

class InputControl extends Component {
  initElementRef = element => {
    this.element = element;
  };

  render() {
    let {className} = this.props;
    const {type} = this.props;
    if (['hidden', 'range'].indexOf(type) !== -1) {
      className = null;
    }
    return (
      <input {...this.props} className={className} ref={this.initElementRef} />
    );
  }
}

InputControl.propTypes = {
  ...ControlCommon.propTypes,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};

InputControl.defaultProps = {
  className: 'form-control',
  type: 'text',
};

export default InputControl;
