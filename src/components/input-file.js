import React, {Component} from 'react';
import ComponentCommon from './component-common';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';
import Icon from './icon';
import FileControl from './controls/input-file';

class File extends Component {
  handleChange = event => {
    const target = event.currentTarget;
    const {value} = target;
    const {onSetValue, onChange, name} = this.props;
    onSetValue(target.files);

    // We're passing an additional argument to the onChange handler here,
    // the 'value' of the field. This value is actually pretty useless,
    // and we're only including here for completeness.
    // An example value would be: "C:\fakepath\name-of-file.txt". Note that
    // if we select multiple files, it only returns a "fakepath" string for
    // the first file.
    // A web search for "C:\fakepath\" gives more details.
    onChange(name, target.files, value);
  };

  initElementRef = control => {
    this.element = control ? control.element : null;
  };

  render() {
    const inputProps = Object.assign({}, this.props);
    Object.keys(ComponentCommon.propTypes).forEach(key => {
      delete inputProps[key];
    });

    const {layout, id, showErrors, help, errorMessages} = this.props;

    const control = (
      <FileControl
        {...inputProps}
        onChange={this.handleChange}
        ref={this.initElementRef}
      />
    );

    if (layout === 'elementOnly') {
      return control;
    }

    return (
      <Row {...this.props} htmlFor={id}>
        {control}
        {showErrors ? (
          <Icon symbol="remove" className="form-control-feedback" />
        ) : null}
        {help ? <Help help={help} /> : null}
        {showErrors ? <ErrorMessages messages={errorMessages} /> : null}
      </Row>
    );
  }
}

File.propTypes = {
  ...FileControl.propTypes,
  ...ComponentCommon.propTypes,
};

File.defaultProps = {
  ...ComponentCommon.defaultProps,
};

export default File;
