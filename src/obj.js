const isEmptyObject = (o) =>
  Object.keys(o).length === 0 && o.constructor === Object

function objFilter(obj, func) {
  let isNum= true
  Object.keys(obj).map((k) => {
    if (isNaN(parseInt(k))) {
      isNum= false
      return
    }
  })
  const parseK = (k) => isNum ? parseInt(k) : k
  let out= {}
  Object.keys(obj)
        .filter((key) => func(parseK(key), obj[key]))
        .map((key) => out[parseK(key)]= obj[key])
  return out
}


function objClone (obj) {
  let copy

  // Handle the 3 simple types, and null or undefined
  if (null == obj || 'object' != typeof obj) return obj

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = []
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = objClone(obj[i])
    }
    return copy
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {}
    for (let attr in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, attr)) copy[attr] = objClone(obj[attr])
    }
    return copy
  }

  throw new Error('Unable to copy obj! Its type isn\'t supported')
}


export {isEmptyObject, objFilter, objClone}