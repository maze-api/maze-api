/* eslint-disable  no-console */
const { parse } = require('url');

module.exports = url => {
  const parsedUrl = parse(url);
  /* istanbul ignore next */
  const redactedAuth = parsedUrl.auth ? '***:***@' : '';
  return `${parsedUrl.protocol}//${redactedAuth}${parsedUrl.hostname}:${parsedUrl.port}${parsedUrl.path}`;
};
