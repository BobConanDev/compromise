if (typeof process !== undefined && typeof module !== undefined) {
  let nlp
  if (process.env.TESTENV === 'prod') {
    console.warn('== production build test 🚀 ==')
    nlp = require('../')
  } else {
    nlp = require('../alt')
  }

  module.exports = nlp
}
