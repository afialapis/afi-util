/**
 * http://raganwald.com/2015/06/26/decorators-in-es7.html
 */

function mixin (behaviour, sharedBehaviour = {}) {
  const instanceKeys = Reflect.ownKeys(behaviour);
  const sharedKeys = Reflect.ownKeys(sharedBehaviour);
  const typeTag = Symbol('isa');

  function _mixin (clazz) {
    for (let property of instanceKeys)
      Object.defineProperty(clazz.prototype, property, {
        value: behaviour[property],
        writable: true
      });
    Object.defineProperty(clazz.prototype, typeTag, { value: true });
    return clazz;
  }
  for (let property of sharedKeys)
    Object.defineProperty(_mixin, property, {
      value: sharedBehaviour[property],
      enumerable: Object.prototype.propertyIsEnumerable.call(sharedBehaviour, property)
    });
  Object.defineProperty(_mixin, Symbol.hasInstance, {
    value: (i) => !!i[typeTag]
  });
  return _mixin;
}

export {mixin}
