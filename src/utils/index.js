export const logError = (err) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.error(err); // eslint-disable-line no-console
};
