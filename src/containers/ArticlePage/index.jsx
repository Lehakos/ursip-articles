import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import Article from 'components/Article';
import Loading from 'components/Loading';
import { Page } from 'hedron';
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
      return (
        <Page>
          <Loading />
        </Page>
      );
    }

    if (!data) {
      return <Page>Ничего не найдено</Page>;
    }

    return (
      <Page>
        <Article
          {...data}
          onDelete={deleteArticle}
        />
      </Page>
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
