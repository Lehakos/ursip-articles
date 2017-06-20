import React from 'react';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import { mountComponent } from 'utils/tests';

import Item, { Content } from '../Item';

describe('<CommentsItem />', () => {
  let props;
  let mountedComponent;
  const renderComponent = () => {
    if (!mountedComponent) {
      mountedComponent = mountComponent(
        <Item {...props} />,
      );
    }

    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      divider: undefined,
      text: undefined,
      user: undefined,
    };
    mountedComponent = undefined;
  });

  it('рендерит Subheader', () => {
    const subheader = renderComponent().find(Subheader);
    expect(subheader.length).toBe(1);
  });

  describe('Subheader', () => {
    it('выводит значение props.user после аватарки', () => {
      props.user = 'Кракозябр';
      const subheader = renderComponent().find(Subheader);
      expect(subheader.props().children[1]).toBe(props.user);
    });
  });

  it('рендерит Avatar', () => {
    const avatar = renderComponent().find(Avatar);
    expect(avatar.length).toBe(1);
  });

  describe('Avatar', () => {
    it('выводит первую букву от props.user в верхнем регистре', () => {
      props.user = 'кракозябр';
      const avatar = renderComponent().find(Avatar);
      expect(avatar.text()).toBe(props.user[0].toUpperCase());
    });
  });

  it('рендерит Content', () => {
    const content = renderComponent().find(Content);
    expect(content.length).toBe(1);
  });

  describe('Content', () => {
    it('выводит значение props.text', () => {
      props.text = 'Какой-то текст';
      const content = renderComponent().find(Content);
      expect(content.props().children).toEqual(props.text);
    });
  });

  describe('Divider', () => {
    it('рендерится если передано props.divider', () => {
      props.divider = true;
      const divider = renderComponent().find(Divider);
      expect(divider.length).toBe(1);
    });

    it('не рендерится если не передано props.divider', () => {
      const divider = renderComponent().find(Divider);
      expect(divider.length).toBe(0);
    });
  });
});
