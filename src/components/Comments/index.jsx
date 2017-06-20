import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import Text from 'components/Text';
import Loading from 'components/Loading';

import CommentItem from './Item';
import NewCommentForm from './NewCommentForm';

export const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export const Content = styled.div``;

export const StyledComment = styled(CommentItem)`
  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

export const CLOSED_TEXT = 'Показать комментарии';
export const OPENED_TEXT = 'Скрыть комментарии';

class Comments extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.toggleComments = ::this.toggleComments;
  }

  toggleComments(e) {
    e.preventDefault();

    const { onOpen, loading } = this.props;

    if (loading) {
      return;
    }

    if (!this.state.open && onOpen) {
      onOpen();

      this.setState({
        open: true,
      });

      return;
    }

    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  render() {
    const { loading, comments, onAddNewComment, className, disableAddNew } = this.props;
    const { open } = this.state;
    const buttonText = open ? OPENED_TEXT : CLOSED_TEXT;
    let content = <Text text="Нет комментариев." />;

    if (loading) {
      content = <Loading />;
    } else if (comments && comments.length) {
      content = comments.map((item, ind) => (
        <StyledComment
          key={item.id}
          {...item}
          divider={ind !== comments.length - 1}
        />
      ));
    }

    return (
      <div className={className}>
        <Header>
          <FlatButton onClick={this.toggleComments} label={buttonText} />
        </Header>
        {
          open &&
          <Content>
            {content}
          </Content>
        }
        {
          !!onAddNewComment && open &&
          <NewCommentForm
            disabled={disableAddNew}
            onSubmit={data => onAddNewComment(data.toJS())}
          />
        }
      </div>
    );
  }
}

Comments.propTypes = {
  className: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.shape({
    ...CommentItem.propTypes,
    id: PropTypes.number.isRequired,
  })),
  disableAddNew: PropTypes.bool,
  loading: PropTypes.bool,
  onAddNewComment: PropTypes.func,
  onOpen: PropTypes.func,
};

export default Comments;
