import axios from 'axios';
import memoize from 'lodash/memoize';

axios.defaults.baseURL = '/api';

const convertToKey = (url, config) => JSON.stringify({ url, config });

const cachedGet = memoize(
  (url, config) => axios.get(url, config)
    .catch((err) => {
      // если запрос возращает ошибку, удаляем результат из кеша,
      // чтобы можно было повторить запрос
      cachedGet.cache.delete(convertToKey(url, config));
      return Promise.reject(err);
    }),
  convertToKey,
);

/**
 * Получить список статей
 * @param {Object} params - фильтры для выборки статей
 * @param {number} params.limit - количество загружаемых статей
 * @param {number} params.offset - с какого индекса хотим получить статьи
 * @returns {Object[]}
 */
export const getArticles = params => cachedGet('/article', { params });

/**
 * Получить детальную информацию по определенной статье
 * @param {string} id - id статьи
 * @returns {Object}
 */
export const getArticle = id => cachedGet(`article/${id}`);

/**
 * Добавить новую статью
 * @param {Object} data - данные для статьи
 */
export const addArticle = data => axios.post('article', data);

/**
 * Удалить статью
 * @param {string | number} id - id статьи
 */
export const deleteArticle = id => axios.delete(`article/${id}`)
  .then((response) => {
    cachedGet.cache.clear();
    return Promise.resolve(response);
  });

/**
 * Получить список комментариев к статье
 * @param {string} article - id статьи
 * @returns {Object[]}
 */
export const getComments = article => cachedGet('comment', { params: { article } });

/**
 * Добавить новый комментарий
 * @param {Object} data - данные для комментария
 */
export const addComment = data => axios.post('comment', data);
