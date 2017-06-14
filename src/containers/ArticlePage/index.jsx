import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import Article from 'components/Article';
import Loading from 'components/Loading';
import {
  selectors as articlesSelectors,
  actions as articlesActions,
} from 'ducks/articles';

// eslint-disable-next-line react/prefer-stateless-function
class ArticlePage extends PureComponent {
  componentDidMount() {
    const { match, loadArticle } = this.props;
    const articleId = match.params.id;
    loadArticle(articleId);
  }

  render() {
    const { data, deleteArticle, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (!data) {
      return <div>Ничего не найдено</div>;
    }

    return (
      <Article
        {...data}
        onDelete={deleteArticle}
      />
    );
  }
}

ArticlePage.propTypes = {
  data: PropTypes.shape(Article.propTypes),
  deleteArticle: PropTypes.func,
  loadArticle: PropTypes.func,
  loading: PropTypes.bool,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  data: articlesSelectors.makeSelectArticleData(),
  loading: articlesSelectors.makeSelectArticleLoadingState(),
});

const mapDispatchToProps = dispatch => ({
  deleteArticle: id => dispatch(articlesActions.deleteArticle(id, '/')),
  loadArticle: id => dispatch(articlesActions.getArticle(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticlePage));
