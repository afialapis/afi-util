import fetch from 'isomorphic-fetch'
import config from 'config/server'

/**
 * This is our overly complicated isomorphic "request"
 * @param user
 * @param baseUrl
 * @returns {Function}
 */
function requestCreator(user) {
  const token = user!=undefined ? user.token : null
  const uid = user != undefined ? user.id : null

  return {
    token,
    uid,
    get(url, params) {
      return buildRequest('GET', token, uid, url, omitNil(params))
    },

    post(url, data, isMultiForm = false) {
      return buildRequest('POST', token, uid,  url, data, isMultiForm)
    }
  }
}

export { requestCreator as default}

/**
 * Build and execute remote request
 * @param method
 * @param url
 * @param params
 * @param config
 */
function buildRequest(method, token, user_id, url, params, isMultiForm) {
  const requestURL = createURL(url) + (method === 'GET' && params ? toQueryString(params) : '')
  const request = {
    method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      'user-id': user_id,
      token
    }
  }
  if (method === 'POST') {
    if (isMultiForm) {
      const formData = new FormData()
      for(let name in params) {
        formData.append(name, params[name]);
      }
      request.body = formData
    } else {
      request.body = JSON.stringify(params || {}, (k, v) => v === undefined ? null : v)
    }
  }

  return fetch(requestURL, request).then(handleResponse)
}

/**
 * Prepend host of API server
 * @param path
 * @returns {String}
 * @private
 */
function createURL(path) {
  if (path.startsWith('http')) {
    return path
  } else if (process.env.BROWSER) {
    return '/' + path.trimLeft('/')
  } else {
    return `http://${config.http.HOSTNAME}:${config.http.PORT}/` + path.trimLeft('/')
  }
}

/**
 * Decide what to do with the response
 * @param response
 * @returns {Promise}
 * @private
 */
function handleResponse(response) {
  const redirect = response.headers.get('Location')
  if (redirect) {
    window.location.replace(redirect)
    return Promise.reject()
  }

  if (response.headers.get('content-type').includes('json')) {
    return response.json().then(res => {
      if (response.status === 403) {
        console.warn('Unauthorized', response, response.ok)
      }
      if (response.ok) {
        return res
      } else {
        return Promise.reject(res)
      }
    })
  }
  return response.text().then(error => { 
    if (response.status!=200) 
      throw error 
  })
}

/**
 * Transform an JSON object to a query string
 * @param params
 * @returns {string}
 */
export function toQueryString(params) {
  return '?' + Object.keys(params).map(k => {
    const name = encodeURIComponent(k)
    if (Array.isArray(params[k])) {
      return params[k].map(val => `${name}[]=${encodeURIComponent(val)}`).join('&')
    }
    return `${name}=${encodeURIComponent(params[k])}`
  }).join('&')
}

/**
 * Transform a query string to a JSON object
 * @param url
 * @returns {string}
 */
export function queryStringToJSON(url) {     
    let search= url.indexOf('?')>=0 ? url.substr(url.indexOf('?')) : '';
    if (search && search!='?') {
      let pairs = search.slice(1).split('&');
      
      let result = {};
      pairs.forEach(function(pair) {
          pair = pair.split('=');
          result[pair[0]] = decodeURIComponent(pair[1] || '');
      });
      return JSON.parse(JSON.stringify(result))
    }
    return {}
}



function omitNil(obj) {
  if (typeof obj !== 'object') return obj
  return Object.keys(obj).reduce((acc, v) => {
    if (obj[v] !== undefined) acc[v] = obj[v]
    return acc
  }, {})
}
