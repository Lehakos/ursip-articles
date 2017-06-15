import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import Article from 'components/Article';
import Text from 'components/Text';
import Comments from 'components/Comments';
import Loading from 'components/Loading';
import {
  selectors as articlesSelectors,
  actions as articlesActions,
} from 'ducks/articles';
import {
  selectors as commentsSelectors,
  actions as commentsActions,
} from 'ducks/comments';

const StyledArticle = styled(Article)`
  margin-bottom: 15px;
`;

// eslint-disable-next-line react/prefer-stateless-function
class ArticlePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      articleId: props.match.params.id,
    };

    this.onCommentsOpen = ::this.onCommentsOpen;
  }

  componentWillMount() {
    const articleId = this.props.match.params.id;

    if (this.state.articleId === articleId) {
      return;
    }

    this.setState({ articleId });
  }

  componentDidMount() {
    this.props.loadArticle(this.state.articleId);
  }

  onCommentsOpen() {
    if (this.props.comments.length) {
      return;
    }

    this.props.loadComments(this.state.articleId);
  }

  render() {
    const {
      data,
      deleteArticle,
      articlesLoading,
      commentsLoading,
      comments,
    } = this.props;

    if (articlesLoading) {
      return <Loading />;
    }

    if (!data) {
      return <Text text="Ничего не найдено." />;
    }

    return (
      <div>
        <StyledArticle
          {...data}
          onDelete={deleteArticle}
        />
        <Comments
          loading={commentsLoading}
          comments={comments}
          onOpen={this.onCommentsOpen}
        />
      </div>
    );
  }
}

ArticlePage.propTypes = {
  comments: Comments.propTypes.comments,
  commentsLoading: PropTypes.bool,
  data: PropTypes.shape(Article.propTypes),
  deleteArticle: PropTypes.func,
  loadArticle: PropTypes.func,
  loadComments: PropTypes.func,
  articlesLoading: PropTypes.bool,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  data: articlesSelectors.makeSelectArticleData(),
  articlesLoading: articlesSelectors.makeSelectArticleLoadingState(),
  commentsLoading: commentsSelectors.makeSelectLoadingState(),
  comments: commentsSelectors.makeSelectComments(),
});

const mapDispatchToProps = dispatch => ({
  deleteArticle: id => dispatch(articlesActions.deleteArticle(id, '/')),
  loadArticle: id => dispatch(articlesActions.getArticle(id)),
  loadComments: id => dispatch(commentsActions.getComments(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticlePage));
