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

export {isEmptyObject, objFilter}