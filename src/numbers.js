function asDecimal(n, d) {
  if (isNaN(n))
    n= parseFloat(0)
  const f = d==undefined
            ? parseFloat(n)
            : parseFloat(n).toFixed(d)
  const parts = f.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  return parts.join(",")
}

function asPrice(n) {
  return asDecimal(n, 2)
}

function asPriceWithCurrency(n) {
  return asPrice(n) + ' €'
}

function parseNum(n) {
  const f = parseFloat(n)
  if (isNaN(f))
    return parseFloat(0)
  return f
}



export { asDecimal, asPrice, asPriceWithCurrency, parseNum }