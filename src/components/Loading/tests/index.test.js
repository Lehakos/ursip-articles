import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';

import { mountComponent } from 'utils/tests';

import Loading, { BASE_SIZE, BASE_FONT } from '../index';

describe('<Loading />', () => {
  let props;
  let mountedComponent;
  const renderComponent = () => {
    if (!mountedComponent) {
      mountedComponent = mountComponent(
        <Loading {...props} />,
      );
    }

    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      text: undefined,
    };
    mountedComponent = undefined;
  });

  it('всегда рендерит CircularProgress', () => {
    const progress = renderComponent().find(CircularProgress);
    expect(progress.length).toBe(1);
  });

  describe('CircularProgress', () => {
    it('его свойство size равно BASE_SIZE * (BASE_FONT / props.fontSize)', () => {
      props.fontSize = 20;
      const size = BASE_SIZE * (BASE_FONT / props.fontSize);
      const progress = renderComponent().find(CircularProgress);
      expect(progress.prop('size')).toBe(size);
    });
  });

  it('всегда рендерит Subheader', () => {
    const subheader = renderComponent().find(Subheader);
    expect(subheader.length).toBe(1);
  });

  describe('Subheader', () => {
    it('если передано props.text, то рендерит его значение', () => {
      props.text = 'Какой-то текст';
      const subheader = renderComponent().find(Subheader);
      expect(subheader.props().children).toEqual(props.text);
    });

    it('props.text может быть элементом', () => {
      props.text = <b>Какой-то текст</b>;
      const subheader = renderComponent().find(Subheader);
      expect(subheader.props().children).toEqual(props.text);
    });
  });
});
