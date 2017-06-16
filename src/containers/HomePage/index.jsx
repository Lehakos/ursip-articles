import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Column } from 'hedron';
import Pagination from 'components/Pagination';
import {
  selectors as articlesSelectors,
  actions as articlesActions,
} from 'ducks/articles';

import HomeSidebar from './HomeSidebar';
import ArticlesPage from './ArticlesPage';

const StyledPagination = styled(Pagination)`
  margin-top: 15px;
`;

// eslint-disable-next-line react/prefer-stateless-function
class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.onPageChange = ::this.onPageChange;
  }

  onPageChange({ selected }) {
    this.props.history.push(`/articles/${selected}`);
  }

  render() {
    const {
      currentPage,
      changeDateFilter,
      changeTitleFilter,
      filters,
      titlesList,
      match,
      totalPages,
    } = this.props;

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
          <Switch>
            <Route path={`${match.url}/:page`} component={ArticlesPage} />
            <Redirect from={match.url} to={`${match.url}/0`} />
          </Switch>
          {
            totalPages > 0 &&
            <StyledPagination
              forcePage={currentPage}
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
  filters: HomeSidebar.propTypes.values,
  changeDateFilter: PropTypes.func,
  changeTitleFilter: PropTypes.func,
  currentPage: PropTypes.number,
  history: PropTypes.object,
  match: PropTypes.object,
  titlesList: PropTypes.arrayOf(PropTypes.string),
  totalPages: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  currentPage: articlesSelectors.makeSelectCurrentPage(),
  filters: articlesSelectors.makeSelectFilters(),
  titlesList: articlesSelectors.makeSelectArticlesTitle(),
  totalPages: articlesSelectors.makeSelectTotalPages(),
});

const mapDispatchToProps = dispatch => ({
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
