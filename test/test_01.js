import co from "co"
import ES6Promise from 'es6-promise'
//import assert from 'assert'

ES6Promise.polyfill()

describe('Afi Util', function() {

  this.timeout(30000)
  
  it("should do something.", co.wrap(function *(){
    console.log('HEY')

    //assert.notEqual(A, B)
  }))  

})
