import { mount } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme();

export const mountComponent = node => mount(
  node,
  {
    context: { muiTheme },
    childContextTypes: { muiTheme: PropTypes.object },
  },
);
