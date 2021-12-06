import fastTag from '../_fastTag.js'
const env = typeof process === 'undefined' ? self.env : process.env || {} // eslint-disable-line

const isCapital = (terms, i) => {
  if (terms[i].tags.has('ProperNoun')) {// 'Comfort Inn'
    return 'Noun'
  }
}
const isAloneVerb = (terms, i) => {
  if (i === 0 && !terms[1]) {// 'Help'
    return 'Verb'
  }
}

const adhoc = {
  'Adj|Gerund': (terms, i) => {
    return isCapital(terms, i)
  },
  'Adj|Noun': (terms, i) => {
    return isCapital(terms, i)
  },
  'Adj|Past': (terms, i) => {
    return isCapital(terms, i)
  },
  'Adj|Present': (terms, i) => {
    return isCapital(terms, i)
  },
  'Noun|Gerund': (terms, i) => {
    return isCapital(terms, i)
  },
  'Noun|Verb': (terms, i) => {
    return isCapital(terms, i) || isAloneVerb(terms, i)
  },
  'Plural|Verb': (terms, i) => {
    return isCapital(terms, i) || isAloneVerb(terms, i)
  },
  'Person|Noun': (terms, i) => {
    return isCapital(terms, i)
  },
  'Person|Verb': (terms, i) => {
    return isCapital(terms, i)
  },
}


const checkWord = (term, obj) => {
  if (!term || !obj) {
    return null
  }
  const found = obj[term.normal]
  if (found && env.DEBUG_TAGS) {
    console.log(`\n  \x1b[2m\x1b[3m     ↓ - '${term.normal}' \x1b[0m`)
  }
  return found
}

const checkTag = (term, obj = {}, tagSet) => {
  if (!term || !obj) {
    return null
  }
  // rough sort, so 'Noun' is after ProperNoun, etc
  let tags = Array.from(term.tags).sort((a, b) => {
    let numA = tagSet[a] ? tagSet[a].parents.length : 0
    let numB = tagSet[b] ? tagSet[b].parents.length : 0
    return numA > numB ? -1 : 1
  })
  let found = tags.find(tag => obj[tag])
  if (found && env.DEBUG_TAGS) {
    console.log(`\n  \x1b[2m\x1b[3m      ↓ - '${term.normal}' (#${found})  \x1b[0m`)
  }
  found = obj[found]
  return found
}

const pickTag = function (terms, i, clues, model) {
  if (!clues) {
    return
  }
  const tagSet = model.one.tagSet
  // look -> right word, first
  let tag = checkWord(terms[i + 1], clues.afterWords)
  // look <- left word, second
  tag = tag || checkWord(terms[i - 1], clues.beforeWords)
  // look <- left tag 
  tag = tag || checkTag(terms[i - 1], clues.beforeTags, tagSet)
  // look -> right tag
  tag = tag || checkTag(terms[i + 1], clues.afterTags, tagSet)
  // console.log(clues)
  return tag
}

const setTag = function (term, tag, model) {
  if (!term.tags.has(tag)) {
    term.tags.clear()
    fastTag(term, tag, `3-[variable]`)
    if (model.one.tagSet[tag]) {
      let parents = model.one.tagSet[tag].parents
      fastTag(term, parents, `  -inferred by #${tag}`)
    }
  }
}

// words like 'bob' that can change between two tags
const doVariables = function (terms, i, model) {
  const { variables, clues } = model.two
  const term = terms[i]
  if (variables.hasOwnProperty(term.normal)) {
    let form = variables[term.normal]
    // console.log(`\n'${term.normal}'  : ${form}`)
    // console.log(clues[form])
    // skip propernouns, acronyms, etc
    if (term.tags.has('Acronym') || term.tags.has('PhrasalVerb')) {
      return
    }
    let tag = pickTag(terms, i, clues[form], model)
    // lean-harder on some variable forms
    if (adhoc[form]) {
      tag = adhoc[form](terms, i) || tag
    }
    // did we find anything?
    if (tag) {
      if (env.DEBUG_TAGS) {
        console.log(`\n  \x1b[32m [variable] - '${term.normal}' - (${form}) → #${tag} \x1b[0m\n`)
      }
      setTag(term, tag, model)
    } else if (env.DEBUG_TAGS) {
      console.log(`\n -> X  - '${term.normal}'  : ${form}  `)
    }
  }
}
export default doVariables