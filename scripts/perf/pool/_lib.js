if (typeof process !== undefined && typeof module !== undefined) {
  let nlp
  if (process.env.TESTENV === 'prod') {
    console.warn('== production build test 🚀 ==')
    nlp = require('../../../builds/compromise.min.js')
  } else {
    nlp = require('../../../src')
    // nlp.extend(require('../plugins/numbers/src'))
  }

  module.exports = nlp
}
