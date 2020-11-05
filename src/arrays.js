import {parseNum}  from './numbers'

function chunkArray(myArray, chunk_size){
  let results = [];
  
  while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
  }
  
  return results;
}

function sumArray(a) {
  return a.reduce((x,y) => x+y, 0);
}

function getTotal(arr, field) {
  let f = parseFloat(0)
  arr.map((d) => {
    f += parseNum(d[field])
  })
  return f
}

export {chunkArray, sumArray, getTotal}