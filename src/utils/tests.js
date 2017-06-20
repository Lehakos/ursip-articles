import { mount } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import configureStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies

const mockStore = configureStore();
const muiTheme = getMuiTheme();

export const mountComponent = (node, initialState = {}) => {
  const store = mockStore(initialState);

  return mount(
    node,
    {
      context: { muiTheme, store },
      childContextTypes: {
        muiTheme: PropTypes.object,
        store: PropTypes.object,
      },
    },
  );
}
