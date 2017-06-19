import React from 'react';
import moment from 'moment';

import { shallow } from 'enzyme';
import { mountComponent } from 'utils/tests';

import StyledDate from './index';

describe('<StyledDate />', () => {
  let props;
  let mountedComponent;
  const renderComponent = () => {
    if (!mountedComponent) {
      mountedComponent = mountComponent(
        <StyledDate {...props} />,
      );
    }

    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      date: undefined,
    };
    mountedComponent = undefined;
  });

  describe('когда не передано свойство date', () => {
    it('ничего не рендерит', () => {
      const component = shallow(<StyledDate />);
      expect(component.type()).toBe(null);
    });
  });

  describe('когда передано свойство date', () => {
    const date = '2014-05-07';
    const obj = new Date(date);
    const num = obj.getTime();

    it('рендерит элемент time', () => {
      props.date = date;
      const time = renderComponent().find('time');
      expect(time.length).toBe(1);
    });

    it('добавляет элементу time атрибут datetime в формате YYYY-MM-DDThh:mm:ssTZD', () => {
      props.date = date;
      const result = moment(date).format();
      const time = renderComponent().find('time').first();
      expect(time.prop('dateTime')).toBe(result);
    });

    describe('выводит его в формате DD.MM.YYYY', () => {
      const result = '07.05.2014';

      it('date может быть строкой', () => {
        props.date = date;
        const wrapper = renderComponent().find('time');
        expect(wrapper.text()).toBe(result);
      });

      it('date может быть числом', () => {
        props.date = num;
        const wrapper = renderComponent().find('time');
        expect(wrapper.text()).toBe(result);
      });

      it('date может быть объектом типа Date', () => {
        props.date = obj;
        const wrapper = renderComponent().find('time');
        expect(wrapper.text()).toBe(result);
      });
    });
  });
});
