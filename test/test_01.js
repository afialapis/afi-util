import assert from 'assert'
import {dates} from '../src'

describe('Checking dates', function() {

  this.timeout(30000)
  
  it("NOW should be greater than TODAY", function () {

    const now= dates.epoch()
    const today= dates.day()

    assert.strictEqual(now >= today, true)
  })

})
