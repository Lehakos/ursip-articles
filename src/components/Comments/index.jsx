import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import Text from 'components/Text';
import Loading from 'components/Loading';

import CommentItem from './Item';
import NewCommentForm from './NewCommentForm';

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const StyledComment = styled(CommentItem)`
  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

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
    const { loading, comments, onAddNewComment, className } = this.props;
    const { open } = this.state;
    const buttonText = open ? 'Скрыть комментарии' : 'Показать комментарии';
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
          content
        }
        {
          !!onAddNewComment && open &&
          <NewCommentForm onSubmit={data => onAddNewComment(data.toJS())} />
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
  loading: PropTypes.bool,
  onAddNewComment: PropTypes.func,
  onOpen: PropTypes.func,
};

export default Comments;
