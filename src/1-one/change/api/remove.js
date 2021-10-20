// transfer sentence-ending punctuation
const repairPunct = function (terms, len) {
  let last = terms.length - 1
  let from = terms[last]
  let to = terms[last - len]
  if (to && from) {
    to.post += from.post //this isn't perfect.
    to.post = to.post.replace(/ +([.?!,;:])/, '$1')
    // don't allow any silly punctuation outcomes like ',!'
    to.post = to.post.replace(/[,;:]+([.?!])/, '$1')
  }
}

// remove terms from document json
const pluckOut = function (document, nots) {
  nots.forEach(ptr => {
    let [n, start, end] = ptr
    let len = end - start
    if (!document[n]) {
      return // weird!
    }
    if (end === document[n].length && end > 1) {
      repairPunct(document[n], len)
    }
    document[n].splice(start, len) // replaces len terms at index start
  })
  // remove any now-empty sentences
  // (foreach + splice = 'mutable filter')
  for (let i = document.length - 1; i >= 0; i -= 1) {
    if (document[i].length === 0) {
      document.splice(i, 1)
      // remove any trailing whitespace before our removed sentence
      if (i === document.length && document[i - 1]) {
        let terms = document[i - 1]
        let lastTerm = terms[terms.length - 1]
        if (lastTerm) {
          lastTerm.post = lastTerm.post.trimEnd()
        }
      }
    }
  }
  return document
}

const methods = {
  /** */
  remove: function (reg) {
    const { indexN } = this.methods.one
    // two modes:
    //  - a. remove self, from full parent
    let self = this.all()
    let not = this
    //  - b. remove a new match, from self
    if (reg) {
      self = this
      not = this.match(reg)
    }
    let ptrs = self.fullPointer
    let nots = not.fullPointer.reverse()
    // remove them from the actual document)
    let document = pluckOut(this.document, nots)
    // repair our pointers
    let gone = indexN(nots)
    ptrs = ptrs.map(ptr => {
      let [n] = ptr
      if (!gone[n]) {
        return ptr
      }
      gone[n].forEach(no => {
        let len = no[2] - no[1]
        // does it effect our pointer?
        if (ptr[1] <= no[1] && ptr[2] >= no[2]) {
          ptr[2] -= len
        }
      })
      return ptr
    })
    // remove any now-empty pointers
    ptrs = ptrs.filter(ptr => {
      const len = ptr[2] - ptr[1]
      if (len <= 0) {
        return false
      }
      return true
    })
    //TODO: fix downstream n pointers
    // mutate original
    self.ptrs = ptrs
    self.document = document
    return self.update(ptrs).compute('index') //return new document
  },
}
// aliases
methods.delete = methods.remove
export default methods
