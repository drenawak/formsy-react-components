/* globals it */

import * as React from 'react';
import {mount} from 'enzyme';
import App from './App';

it('renders the playground example without crashing', (): void => {
  mount(<App />);
});
