import React, { Component, PropTypes } from 'react';
import { controlProps, commonProps } from './prop-types';
import ErrorMessages from './error-messages';
import Help from './help';
import Row from './row';

class RadioGroup extends Component {

    constructor (props) {
        super(props);
        this.elements = {};
    }

    handleChange = (event) => {
        let value = event.currentTarget.value;
        this.props.onSetValue(value);
        this.props.onChange(this.props.name, value);
    }

    renderElement = () => {
        const controls = this.props.options.map((radio, key) => {
            let checked = (this.props.value === radio.value);
            let disabled = radio.disabled || this.props.disabled;
            let className = 'radio' + (disabled ? ' disabled' : '');
            if (this.props.type === 'inline') {
                return (
                    <label className="radio-inline" key={key}>
                        <input
                            ref={(input) => { this.elements[radio.value] = input }}
                            checked={checked}
                            type="radio"
                            value={radio.value}
                            onChange={this.handleChange}
                            disabled={disabled}
                        /> {radio.label}
                    </label>
                );
            }
            return (
                <div className={className} key={key}>
                    <label>
                        <input
                            ref={(input) => { this.elements[radio.value] = input }}
                            checked={checked}
                            type="radio"
                            value={radio.value}
                            onChange={this.handleChange}
                            disabled={disabled}
                        /> {radio.label}
                    </label>
                </div>
            );
        });
        return controls;
    }

    render() {

        let element = this.renderElement();

        if (this.props.layout === 'elementOnly') {
            return (
                <div>{element}</div>
            );
        }

        return (
            <Row
                {...this.props}
                fakeLabel={true}
            >
                {element}
                {this.props.help ? <Help help={this.props.help} /> : null}
                {this.props.showErrors ? <ErrorMessages messages={this.props.errorMessages} /> : null}
            </Row>
        );
    }
}

RadioGroup.propTypes = {
    ...controlProps,
    ...commonProps,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            disabled: PropTypes.bool,
            value: PropTypes.string,
            label: PropTypes.node
        })
    ),
    type: PropTypes.oneOf(['inline', 'stacked'])
};

RadioGroup.defaultProps = {
    type: 'stacked',
    label: '',
    options: [],
    help: null
};

export default RadioGroup;