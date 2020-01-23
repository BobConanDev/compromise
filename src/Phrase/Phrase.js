const methods = require('./methods')
const matchMethods = require('./match')
// const tokenize = require('../01-tokenizer')

class Phrase {
  constructor(id, length, pool) {
    this.start = id
    this.length = length
    this.isA = 'Phrase' // easier than .constructor...
    Object.defineProperty(this, 'pool', {
      enumerable: false,
      writable: true,
      value: pool,
    })
    Object.defineProperty(this, 'cache', {
      enumerable: false,
      writable: true,
      value: {},
    })
    Object.defineProperty(this, 'names', {
      enumerable: false,
      writable: true,
      value: {},
    })
  }
}

/** create a new Phrase object from an id and length */
Phrase.prototype.buildFrom = function(id, length) {
  let p = new Phrase(id, length, this.pool)
  if (this.cache) {
    p.cache = this.cache
    if (length !== this.length) {
      p.cache.terms = null
    }
  }
  //copy-over capture-groups too
  if (this.names) {
    p.names = this.names
  }
  return p
}

//apply methods
Object.assign(Phrase.prototype, matchMethods)
Object.assign(Phrase.prototype, methods)

//apply aliases
const aliases = {
  term: 'terms',
}
Object.keys(aliases).forEach(k => (Phrase.prototype[k] = Phrase.prototype[aliases[k]]))

module.exports = Phrase
