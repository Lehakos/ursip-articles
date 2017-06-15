import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Column } from 'hedron';
import Text from 'components/Text';
import ArticlesList from 'components/ArticlesList';
import Loading from 'components/Loading';
import {
  selectors as articlesSelectors,
  actions as articlesActions,
} from 'ducks/articles';

import HomeSidebar from './HomeSidebar';

// eslint-disable-next-line react/prefer-stateless-function
class HomePage extends Component {
  componentDidMount() {
    this.props.getArticles();
  }

  render() {
    const {
      articles,
      deleteArticle,
      loading,
      titlesList,
      changeDateFilter,
      changeTitleFilter,
      filters,
    } = this.props;

    let content = (
      <ArticlesList
        items={articles}
        onItemDelete={deleteArticle}
      />
    );

    if (loading) {
      content = <Loading />;
    } else if (!articles || !articles.length) {
      content = <Text text="Не найдено ни одной статьи." />;
    }

    return (
      <Row>
        <Column sm={4}>
          <HomeSidebar
            values={filters}
            titlesList={titlesList}
            onTitleFilterChange={changeTitleFilter}
            onDateFilterChange={changeDateFilter}
          />
        </Column>
        <Column sm={8}>
          {content}
        </Column>
      </Row>
    );
  }
}

HomePage.propTypes = {
  articles: ArticlesList.propTypes.items,
  filters: HomeSidebar.propTypes.values,
  changeDateFilter: PropTypes.func,
  changeTitleFilter: PropTypes.func,
  deleteArticle: PropTypes.func,
  getArticles: PropTypes.func,
  loading: PropTypes.bool,
  titlesList: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = createStructuredSelector({
  articles: articlesSelectors.makeSelectArticlesList(),
  filters: articlesSelectors.makeSelectFilters(),
  loading: articlesSelectors.makeSelectListLoadingState(),
  titlesList: articlesSelectors.makeSelectArticlesTitle(),
});

const mapDispatchToProps = dispatch => ({
  getArticles: () => dispatch(articlesActions.getArticles()),
  deleteArticle: id => dispatch(articlesActions.deleteArticle(id)),
  changeDateFilter: range => dispatch(articlesActions.changeFilter({
    date: {
      start: range[0],
      end: range[1],
    },
  })),
  changeTitleFilter: query => dispatch(articlesActions.changeFilter({
    title: query,
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
