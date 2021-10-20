const trimEnd = /[,:;)\]*.?~!\u0022\uFF02\u0027\u201D\u2019\u00BB\u203A\u2032\u2033\u2034\u301E\u00B4—-]+/
const trimStart =
  /^[(['"*~\uFF02\u201C\u2018\u201F\u201B\u201E\u2E42\u201A\u00AB\u2039\u2035\u2036\u2037\u301D\u0060\u301F]+/

const punctToKill = /[,:;)('"]/
const isHyphen = /^[-–—]$/

const textFromTerms = function (terms, opts, keepSpace = true) {
  let txt = ''
  terms.forEach(t => {
    let pre = t.pre || ''
    let post = t.post || ''

    if (opts.punctuation === 'some') {
      pre = pre.replace(trimStart, '')
      // replace a hyphen with a space
      if (isHyphen.test(post)) {
        post = ' '
      }
      post = post.replace(punctToKill, '')
    }
    if (opts.whitespcae === 'some') {
      pre = pre.replace(/\s/, '') //remove pre-whitespace
      post = post.replace(/\s+/, ' ') //replace post-whitespace with a space
    }
    if (!opts.keepPunct) {
      pre = pre.replace(trimStart, '')
      if (post === '-') {
        post = ' '
      } else {
        post = post.replace(trimEnd, '')
      }
    }
    // grab the correct word format
    let word = t[opts.use || 'text'] || t.normal || ''
    txt += pre + word + post
  })
  if (keepSpace === false) {
    txt = txt.trim()
  }
  if (opts.lowerCase === true) {
    txt = txt.toLowerCase()
  }
  return txt
}

const textFromDoc = function (docs, opts) {
  let text = ''
  for (let i = 0; i < docs.length; i += 1) {
    // middle
    text += textFromTerms(docs[i], opts, true)
  }
  if (!opts.keepSpace) {
    text = text.trim()
  }
  if (opts.keepPunct === false) {
    text = text.replace(trimStart, '')
    text = text.replace(trimEnd, '')
  }
  if (opts.cleanWhitespace === true) {
    text = text.trim()
  }
  return text
}
export { textFromDoc, textFromTerms }
