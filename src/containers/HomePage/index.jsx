import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Page } from 'hedron';
import ArticlesList from 'components/ArticlesList';
import Loading from 'components/Loading';
import {
  selectors as articlesSelectors,
  actions as articlesActions,
} from 'ducks/articles';

// eslint-disable-next-line react/prefer-stateless-function
class HomePage extends Component {
  componentDidMount() {
    this.props.getArticles();
  }

  render() {
    const { articles, deleteArticle, loading } = this.props;

    return (
      <Page>
        {
          loading ?
            <Loading />
            :
            <ArticlesList
              items={articles}
              onItemDelete={deleteArticle}
            />
        }
      </Page>
    );
  }
}

HomePage.propTypes = {
  articles: ArticlesList.propTypes.items,
  deleteArticle: PropTypes.func,
  getArticles: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  articles: articlesSelectors.makeSelectArticlesList(),
  loading: articlesSelectors.makeSelectListLoadingState(),
});

const mapDispatchToProps = dispatch => ({
  getArticles: () => dispatch(articlesActions.getArticles()),
  deleteArticle: id => dispatch(articlesActions.deleteArticle(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
