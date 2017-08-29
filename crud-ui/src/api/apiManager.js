import { normalize } from 'normalizr';

const APIManager = (requestInfoParam = {}, schema) => {
  const requestInfo = Object.assign({
    method: 'GET',
    endpoint: '',
    body: null,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }, requestInfoParam);

  const {
    method,
    endpoint,
    body,
    headers,
  } = requestInfo;
  const fullUrl = `${window.__APP_API_URL__}${endpoint}`;

  const options = {
    method,
    headers,
    credentials: 'same-origin',
  };

  if (body) {
    if (method !== 'GET') {
      options.body = Object.keys(body).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`).join('&');
    } else {
      options.body = JSON.stringify(body);
    }
  }

  return fetch(fullUrl, options).then(response =>
    response.json().then(json => ({ json, response })),
  ).then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return schema ? normalize(json, schema) : json;
  });
};

export default APIManager;
