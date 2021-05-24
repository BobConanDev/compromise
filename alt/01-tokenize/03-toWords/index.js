const tokenize = require('./tokenize')
const hasSlash = /\//

/** reduced is one step further than clean */
const reduce = function (str) {
  // remove apostrophes
  str = str.replace(/['’]s$/, '')
  str = str.replace(/s['’]$/, 's')
  return str
}

/** turn given text into a parsed-up object
 * seperate the 'meat' of the word from the whitespace+punctuation
 */
const parseTerm = (txt, normalize) => {
  // cleanup any punctuation as whitespace
  let { str, pre, post } = tokenize(txt)

  // create the various forms of our text,
  let clean = normalize(str)
  const parsed = {
    text: str,
    clean: clean,
    reduced: reduce(clean),
    pre: pre,
    post: post,
  }
  // support aliases for slashes
  if (hasSlash.test(str)) {
    str.split(hasSlash).forEach(word => {
      parsed.alias = parsed.alias || {}
      parsed.alias[word.trim()] = true
    })
  }
  return parsed
}
module.exports = parseTerm
