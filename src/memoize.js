
module.exports = function(target, key, descriptor) {
  const fType = descriptor.get ? 'get' : 'value';
  const fn = descriptor[fType];
  const char0 = String.fromCharCode(0);
  const memoizedCache = '_memo' //Symbol.for('memoizedCache');

  descriptor[fType] = function() {
    this[memoizedCache] = this[memoizedCache] || Object.create(null);
    let cacheKey = key;

    for (const arg of arguments) {
      const type = typeof arg;

      cacheKey += char0 + (
        (arg  === null)                     ? 'null'              :
        (arg  === void 0)                   ? 'undefined'         :
        (type === 'function')               ? arg                 :
        (type === 'object' && arg.id)       ? arg.id              :
        (type === 'object' && arg.hashCode) ? arg.hashCode()      :
        (type === 'object')                 ? JSON.stringify(arg) :
        arg
      );
    }

    if (!(cacheKey in this[memoizedCache])) {
      this[memoizedCache][cacheKey] = fn.apply(this, arguments);
    }

    return this[memoizedCache][cacheKey];
  };

  return descriptor;
};


/*

https://github.com/linusnorton/memoized-decorator/blob/master/index.js

module.exports = function(target, key, descriptor) {
  const fType = descriptor.get ? 'get' : 'value';
  const fn = descriptor[fType];
  const char0 = String.fromCharCode(0);
  const memoizedCache = Symbol.for('memoizedCache');

  descriptor[fType] = function() {
    this[memoizedCache] = this[memoizedCache] || Object.create(null);
    let cacheKey = key;

    for (const arg of arguments) {
      const type = typeof arg;

      cacheKey += char0 + (
        (arg  === null)                     ? 'null'              :
        (arg  === void 0)                   ? 'undefined'         :
        (type === 'function')               ? arg                 :
        (type === 'object' && arg.id)       ? arg.id              :
        (type === 'object' && arg.hashCode) ? arg.hashCode()      :
        (type === 'object')                 ? JSON.stringify(arg) :
        arg
      );
    }

    if (!(cacheKey in this[memoizedCache])) {
      this[memoizedCache][cacheKey] = fn.apply(this, arguments);
    }

    return this[memoizedCache][cacheKey];
  };

  return descriptor;
};

*/