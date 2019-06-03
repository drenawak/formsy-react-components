/* eslint-env node, browser */

import * as React from 'react';
import Playground from './playground';
import Options from './options';

const initialState = Object.freeze({
  layout: 'horizontal',
  showingOptions: true,
  validateBeforeSubmit: true,
  validatePristine: false,
  disabled: false,
});

type State = typeof initialState;

class App extends React.Component<{}, State> {
  public constructor(props) {
    super(props);
    this.state = initialState;
  }

  private handleChangeOption = (name, value) => {
    const newState = {};
    if (Array.isArray(value)) {
      let options: string[];
      if (name === 'validationOptions') {
        options = ['validatePristine', 'validateBeforeSubmit'];
      } else if (name === 'elementOptions') {
        options = ['disabled'];
      } else {
        options = [];
      }
      options.forEach(
        (option): void => {
          newState[option] = value.indexOf(option) !== -1;
        },
      );
    } else {
      newState[name] = value;
    }
    this.setState(newState);
  };

  private handleToggleOptions = (): void => {
    const {showingOptions} = this.state;
    this.setState({showingOptions: !showingOptions});
  };

  public render() {
    const {
      layout,
      validateBeforeSubmit,
      validatePristine,
      showingOptions,
      disabled,
    } = this.state;
    return (
      <div>
        <h1 className="pb-2 mt-4 mb-3 border-bottom">Form Playground</h1>
        <Options
          layoutChoice={layout}
          validateBeforeSubmitChoice={validateBeforeSubmit}
          validatePristineChoice={validatePristine}
          showing={showingOptions}
          disabledChoice={disabled}
          onChangeOption={this.handleChangeOption}
          onToggle={this.handleToggleOptions}
        />
        <h2 className="pb-2 mt-4 mb-3 border-bottom">
          Layout: <code>{layout}</code>
        </h2>
        <Playground
          layoutChoice={layout}
          validateBeforeSubmitChoice={validateBeforeSubmit}
          validatePristineChoice={validatePristine}
          disabledChoice={disabled}
        />
      </div>
    );
  }
}

export default App;