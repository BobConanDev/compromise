import { noop, isPlural, isAreAm, doDoes } from './lib.js'

// walk->walked
const simple = (vb, parsed) => {
  const { verbConjugate, verbToInfinitive } = vb.methods.two.transform
  let str = parsed.root.text('normal')
  str = verbToInfinitive(str, vb.model)
  // 'i walk' vs 'he walks'
  if (isPlural(vb, parsed) === false) {
    str = verbConjugate(str, vb.model).PresentTense
  }
  // handle copula
  if (parsed.root.has('#Copula')) {
    str = isAreAm(vb, parsed)
  }
  if (str) {
    vb = vb.replace(parsed.root, str)
    vb.not('#Particle').tag('PresentTense')
  }
  return vb
}

const toGerund = (vb, parsed) => {
  const { verbConjugate, verbToInfinitive } = vb.methods.two.transform
  let str = parsed.root.text('normal')
  str = verbToInfinitive(str, vb.model)
  // 'i walk' vs 'he walks'
  if (isPlural(vb, parsed) === false) {
    str = verbConjugate(str, vb.model).Gerund
  }
  if (str) {
    vb = vb.replace(parsed.root, str)
    vb.not('#Particle').tag('Gerund')
  }
  return vb
}

const toInfinitive = (vb, parsed) => {
  const { verbToInfinitive } = vb.methods.two.transform
  let str = parsed.root.text('normal')
  str = verbToInfinitive(str, vb.model)
  if (str) {
    vb = vb.replace(parsed.root, str)
  }
  return vb
}



const forms = {
  // he walks -> he walked
  'simple-present': noop,
  // he walked
  'simple-past': simple,
  // he will walk -> he walked
  'simple-future': (vb, parsed) => {
    const { root, auxiliary } = parsed
    // handle 'will be'
    if (auxiliary.has('will') && root.has('be')) {
      let str = isAreAm(vb, parsed)
      vb.replace(root, str)
      vb = vb.remove('will')
    } else {
      simple(vb, parsed)
      vb = vb.remove('will')
    }
    return vb
  },

  // is walking ->
  'present-progressive': noop,
  // was walking -> is walking
  'past-progressive': (vb, parsed) => {
    let str = isAreAm(vb, parsed)
    return vb.replace('(were|was)', str)
  },
  // will be walking -> is walking
  'future-progressive': vb => {
    vb.match('will').insertBefore('is')
    vb.remove('be')
    return vb.remove('will')
  },

  // has walked ->  (?)
  'present-perfect': noop,
  // had walked -> has walked
  'past-perfect': vb => vb.replace('had', 'has'),
  // will have walked -> has walked
  'future-perfect': vb => {
    vb.match('will').insertBefore('has')
    return vb.remove('have').remove('will')
  },

  // has been walking
  'present-perfect-progressive': noop,
  // had been walking
  'past-perfect-progressive': vb => vb.replace('had', 'has'),
  // will have been -> has been
  'future-perfect-progressive': vb => {
    vb.match('will').insertBefore('has')
    return vb.remove('have').remove('will')
  },

  // got walked -> is walked
  // was walked -> is walked
  // had been walked -> is walked
  'passive-past': (vb, parsed) => {
    let str = isAreAm(vb, parsed)
    if (vb.has('(had|have|has)') && vb.has('been')) {
      vb.replace('(had|have|has)', str)
      vb.replace('been', 'being')
      return vb
    }
    return vb.replace('(got|was|were)', str)
  },
  // is being walked  ->
  'passive-present': noop,
  // will be walked -> is being walked
  'passive-future': vb => {
    vb.replace('will', 'is')
    return vb.replace('be', 'being')
  },

  // would be walked ->
  'present-conditional': noop,
  // would have been walked ->
  'past-conditional': vb => {
    vb.replace('been', 'be')
    return vb.remove('have')
  },

  // is going to drink -> is drinking
  'auxiliary-future': (vb, parsed) => {
    toGerund(vb, parsed)
    vb.remove('(going|to)')
    return vb
  },
  // used to walk -> is walking
  // did walk -> is walking
  'auxiliary-past': (vb, parsed) => {
    // 'did provide' -> 'does provide'
    if (parsed.auxiliary.has('did')) {
      let str = doDoes(vb, parsed)
      vb.replace(parsed.auxiliary, str)
      return vb
    }
    toGerund(vb, parsed)
    vb.replace(parsed.auxiliary, 'is')
    return vb
  },
  // we do walk ->
  'auxiliary-present': noop,

  // must walk -> 'must have walked'
  'modal-infinitive': noop,
  // must have walked
  'modal-past': (vb, parsed) => {
    toInfinitive(vb, parsed)
    return vb.remove('have')
  },
  // wanted to walk
  'want-infinitive': vb => {
    vb.replace('(want|wanted)', 'wants')
    vb.remove('will')
    return vb
  },
}

const toPresent = function (vb, parsed, form) {
  // console.log(form)
  if (forms.hasOwnProperty(form)) {
    vb = forms[form](vb, parsed)
    vb.fullSentence().compute(['preTagger', 'postTagger', 'chunks'])
    return vb
  }
  return vb
}
export default toPresent
