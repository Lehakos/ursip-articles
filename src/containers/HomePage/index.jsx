import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Column } from 'hedron';
import Pagination from 'components/Pagination';
import Text from 'components/Text';
import ArticlesList from 'components/ArticlesList';
import Loading from 'components/Loading';
import {
  selectors as articlesSelectors,
  actions as articlesActions,
} from 'ducks/articles';

import HomeSidebar from './HomeSidebar';

const StyledPagination = styled(Pagination)`
  margin-top: 15px;
`;

const ARTICLES_PER_PAGE = 3;

// eslint-disable-next-line react/prefer-stateless-function
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.onPageChange = ::this.onPageChange;
  }

  componentDidMount() {
    this.props.getArticles(0);
  }

  onPageChange({ selected }) {
    this.props.getArticles(selected);
  }

  render() {
    const {
      articles,
      deleteArticle,
      changeDateFilter,
      changeTitleFilter,
      filters,
      loading,
      titlesList,
      totalPages,
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
          {
            totalPages > 0 &&
            <StyledPagination
              onPageChange={this.onPageChange}
              pageCount={totalPages}
            />
          }
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
  totalPages: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  articles: articlesSelectors.makeSelectArticlesList(),
  filters: articlesSelectors.makeSelectFilters(),
  loading: articlesSelectors.makeSelectListLoadingState(),
  titlesList: articlesSelectors.makeSelectArticlesTitle(),
  totalPages: articlesSelectors.makeSelectTotalPages(),
});

const mapDispatchToProps = dispatch => ({
  getArticles: pageNum => dispatch(articlesActions.getArticles({
    limit: ARTICLES_PER_PAGE,
    offset: pageNum * ARTICLES_PER_PAGE,
  })),
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
