import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Text from 'components/Text';
import ArticlesList from 'components/ArticlesList';
import Loading from 'components/Loading';
import {
  selectors as articlesSelectors,
  actions as articlesActions,
} from 'ducks/articles';

const ARTICLES_PER_PAGE = 3;

// eslint-disable-next-line react/prefer-stateless-function
class ArticlesPage extends PureComponent {
  componentDidMount() {
    const pageNum = this.props.match.params.page;
    this.props.getArticles(pageNum);
  }

  componentWillReceiveProps(nextProps) {
    const nextPage = nextProps.match.params.page;
    const currentPage = this.props.match.params.page;

    if (nextPage === currentPage) {
      return;
    }

    this.props.getArticles(nextPage);
  }

  render() {
    const {
      articles,
      deleteArticle,
      loading,
    } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (!articles || !articles.length) {
      return <Text text="Не найдено ни одной статьи." />;
    }

    return (
      <ArticlesList
        items={articles}
        onItemDelete={deleteArticle}
      />
    );
  }
}

ArticlesPage.propTypes = {
  articles: ArticlesList.propTypes.items,
  deleteArticle: PropTypes.func,
  getArticles: PropTypes.func,
  loading: PropTypes.bool,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  articles: articlesSelectors.makeSelectArticlesList(),
  loading: articlesSelectors.makeSelectListLoadingState(),
});

const mapDispatchToProps = dispatch => ({
  getArticles: pageNum => dispatch(articlesActions.getArticles({
    limit: ARTICLES_PER_PAGE,
    offset: pageNum * ARTICLES_PER_PAGE,
  })),
  deleteArticle: id => dispatch(articlesActions.deleteArticle(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticlesPage));
