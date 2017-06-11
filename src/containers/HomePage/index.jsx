import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectors as articlesSelectors,
  actions as articlesActions,
} from 'ducks/articles';
import ArticlesList from 'components/ArticlesList';

// eslint-disable-next-line react/prefer-stateless-function
class HomePage extends Component {
  componentDidMount() {
    this.props.getArticles();
  }

  render() {
    const { articles, deleteArticle } = this.props;

    return (
      <div>
        <ArticlesList
          items={articles}
          onItemDelete={deleteArticle}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  articles: ArticlesList.propTypes.items,
  deleteArticle: PropTypes.func,
  getArticles: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  articles: articlesSelectors.makeSelectArticlesList(),
});

const mapDispatchToProps = dispatch => ({
  getArticles: () => dispatch(articlesActions.getArticles()),
  deleteArticle: id => dispatch(articlesActions.deleteArticle(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
