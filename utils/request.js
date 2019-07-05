require('es6-promise').polyfill();
require('isomorphic-fetch');
import config from './config';

export const fetchAPI = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(`${config.origin}${url}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      mode: 'cors',
      ...options,
      body: JSON.stringify(options.body),
    }).then(checkStatus)
      .then(checkFileType)
      .then(checkCode)
      .then(function (res) {
        return resolve(res);
      }).catch(function (err) {
        return reject(err);
      });
  });
};

function checkCode(response) {
  if (response.code !== 0) {
    return handleError(response.code, response);
  }
  return response;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return response.json().then(json => handleError(response.status, json));
}

function checkFileType(response) {
  const contentType = response.headers.get('content-type');
  if (contentType === 'text/csv' || contentType.indexOf('application/octet-stream') !== -1) {
    response.blob().then((blob) => {
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      const fileNameStr = response.headers.get('content-disposition');
      const filename = fileNameStr.replace(/attachment;\s*filename=/, ''); // based on response HEADER
      a.href = url;
      a.download = decodeURIComponent(filename);
      a.click();
      window.URL.revokeObjectURL(url);
    });
    return {code: 0};
  }

  // otherwise it's a json response
  return response.json();
}

function handleError(code, response = '') {
  console.error('fetch error:');
  console.error('code: ', code);
  console.error('response: ', response);
  const error = new Error();
  error.code = code;
  error.response = response;
  throw error;
}
