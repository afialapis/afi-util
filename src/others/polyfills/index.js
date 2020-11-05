const find = require('lodash/find')
const extend = require('lodash/extend')
const includes = require('lodash/includes')

// For IE 11
if (typeof Promise === 'undefined') {
  global.Promise = require('promise-polyfill')
}

global.Exception = class Exception extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'Exception';
  }
}

/**
 * Returns a numeric hash of a string
 * @returns {number}
 */
String.prototype.hashCode = function() {
  let hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash
}


String.prototype.replaceAll = function (find, replace) {
  return this.replace(new RegExp(find, 'g'), replace);
}

/**
 * Here we add a few ES6 polyfills since we dont want to include whole of babel-polyfill
 */
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    return find(this, predicate)
  };
}

if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement) {
    return includes(this, searchElement);
  };
}

if (!Array.prototype.remove) {
  Array.prototype.remove = function (element) {
    let index = this.indexOf(element);
    if (index > -1) {
      return this.splice(index, 1);
    }
    return []
  };
}


if (typeof Object.assign != 'function') {
  Object.assign = extend;
}

if (typeof Object.update != 'function') {
  Object.update = function (obj1, obj2, ignore= []) {
    const chkKeys = ignore.length > 0 
      ? Object.keys(obj1).filter((k) => ignore.indexOf(k)==-1)
      : Object.keys(obj1)
    chkKeys.map((key) => {
      if (Object.keys(obj2).indexOf(key) >= 0) {
        obj1[key] = obj2[key]
      }
    })
    return obj1
  };
}

if (typeof Object.toJson != 'function') {
  Object.toJson = function (obj) {
    let d = {}
    Object.entries(obj).map(function (k) { d[k[0]] = k[1] })
    return d
  };
}

if (typeof Object.deepGet != 'function') {
  Object.deepGet = function (obj, path) {
    return path.split('.').reduce(function (prev, curr) {
      return prev ? prev[curr] : undefined
    }, obj || self)
  };
}
if (typeof Object.clone != 'function') {
  Object.clone = function (obj) {
    return Object.assign({}, obj)
  };
}



if (!String.prototype.includes) {
  String.prototype.includes = function includes(str) {
    return this.indexOf(str) !== -1;
  };
}
//if (!String.prototype.trimLeft) {
  String.prototype.trimLeft = function trimLeft(str) {
    return remove(this, `^${str || '\\s'}+`);
  };
//}
//if (!String.prototype.trimRight) {
  String.prototype.trimRight = function trimRight(str) {
    return remove(this, `${str || '\\s'}+$`);
  };
//}

function remove(str, rx) {
  return str.replace(new RegExp(rx), '');
}


global.uvl = (v1, v2) => {
  return v1!=undefined ? v1 : v2
}