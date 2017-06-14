import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <h2>
          Ошибка 404
        </h2>
        <p>Такой страницы не найдено :*(</p>
      </div>
    );
  }
}

export default NotFoundPage;
