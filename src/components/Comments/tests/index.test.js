import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import Loading from 'components/Loading';
import Text from 'components/Text';
import { mountComponent } from 'utils/tests';

import Comments, {
  Header,
  Content,
  StyledComment,
  OPENED_TEXT,
  CLOSED_TEXT,
} from '../index';
import NewCommentForm from '../NewCommentForm';
import commentsData from './mocks';

describe('<Comments />', () => {
  let props;
  let mountedComponent;
  const renderComponent = (open = false) => {
    if (!mountedComponent) {
      mountedComponent = mountComponent(
        <Comments {...props} />,
      );
    }

    mountedComponent.setState({ open });

    return mountedComponent;
  };

  beforeEach(() => {
    props = {
      comments: undefined,
      loading: undefined,
    };
    mountedComponent = undefined;
  });

  describe('<Comments />', () => {
    it('рендерит Header', () => {
      const header = renderComponent().find(Header);
      expect(header.length).toBe(1);
    });

    describe('Кнопка показать/скрыть комментарии', () => {
      const component = renderComponent();
      const header = component.find(Header);
      const btn = header.find(FlatButton);

      it('рендерится внутри Header', () => {
        expect(btn.length).toBe(1);
      });

      it(`когда комментарии скрыты выводит текст "${CLOSED_TEXT}"`, () => {
        component.setState({ open: false });
        expect(btn.text()).toBe(CLOSED_TEXT);
      });

      it(`когда комментарии открыты выводит текст "${OPENED_TEXT}"`, () => {
        component.setState({ open: true });
        expect(btn.text()).toBe(OPENED_TEXT);
      });
    });

    describe('Content', () => {
      describe('Рендер зависит от state.open', () => {
        it('не рендерится, когда state.open = false', () => {
          const content = renderComponent().find(Content);
          expect(content.length).toBe(0);
        });

        it('рендерится, когда state.open = true', () => {
          const content = renderComponent(true).find(Content);
          expect(content.length).toBe(1);
        });
      });

      it('рендерит прелоадер, если передано props.loading', () => {
        props.loading = true;
        const loader = renderComponent(true).find(Loading);
        expect(loader.length).toBe(1);
      });

      it('если props.loading и props.comments == false, рендерит сообщение', () => {
        const text = renderComponent(true).find(Text);
        expect(text.length).toBe(1);
      });

      it('рендерит список комментариев если передан props.comments', () => {
        props.comments = commentsData;

        const content = renderComponent(true).find(Content);

        const result = commentsData.map((item, ind) => (
          <StyledComment
            key={item.id}
            {...item}
            divider={ind !== commentsData.length - 1}
          />
        ));

        expect(content.contains(result)).toEqual(true);
      });
    });
  });

  describe('Форма добавления нового комментария', () => {
    beforeEach(() => {
      props.onAddNewComment = () => {};
    });

    it('рендерится если передано props.onAddNewComment', () => {
      const form = renderComponent(true).find(NewCommentForm);
      expect(form.length).toBe(1);
    });

    it('не рендерится если не передано props.onAddNewComment', () => {
      props.onAddNewComment = undefined;
      const form = renderComponent(true).find(NewCommentForm);
      expect(form.length).toBe(0);
    });

    it('props.disableAddNew передается форме как свойство disabled', () => {
      props.disableAddNew = true;
      const form = renderComponent(true).find(NewCommentForm);
      expect(form.props().disabled).toBe(props.disableAddNew);
    });
  });
});
