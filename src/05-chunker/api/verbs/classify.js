const present = { tense: 'PresentTense' }
const conditional = { conditional: true }
const future = { tense: 'FutureTense' }
const prog = { progressive: true }
const past = { tense: 'PastTense' }
const complete = { complete: true, progressive: false }
const passive = { passive: true }
const plural = { plural: true }
const singular = { plural: false }

const getData = function (tags) {
  let data = {}
  tags.forEach(o => {
    Object.assign(data, o)
  })
  return data
}

const verbForms = {
  // === Simple ===
  'simple-present': [
    // he walks',
    ['^#PresentTense$', [present]],
  ],
  'simple-past': [
    // he walked',
    ['^#PastTense$', [past]],
  ],
  'simple-future': [
    // he will walk
    ['^will #Infinitive$', [future]],
  ],

  // === Progressive ===
  'present-progressive': [
    // he is walking
    ['^(is|are|am) #Gerund$', [present, prog]],
  ],
  'past-progressive': [
    // he was walking
    ['^(was|were) #Gerund$', [past, prog]],
  ],
  'future-progressive': [
    // he will be
    ['^will be #Gerund$', [future, prog]],
  ],

  // === Perfect ===
  'present-perfect': [
    // he has walked
    ['^(has|have) #PastTense$', [past, complete]], //past?
  ],
  'past-perfect': [
    // he had walked
    ['^had #PastTense$', [past, complete]],
  ],
  'future-perfect': [
    // he will have
    ['^will have #PastTense$', [future, complete]],
  ],

  // === Progressive-perfect ===
  'present-perfect-progressive': [
    // he has been walking
    ['^(has|have) been #Gerund$', [past, prog]], //present?
  ],
  'past-perfect-progressive': [
    // he had been
    ['^had been #Gerund$', [past, prog]],
  ],
  'future-perfect-progressive': [
    // will have been
    ['^will have been #Gerund$', [future, prog]],
  ],

  // ==== Passive ===
  'passive-past': [
    // got walked, was walked, were walked
    ['(got|were|was) (#PastTense|#Participle)', [past, passive]],
    // was being walked
    ['^(is|was|were) being (#PastTense|#Participle)', [past, passive]],
    // had been walked, have been eaten
    ['^(had|have) been (#PastTense|#Participle)', [past, passive]],
  ],
  'passive-present': [
    // is walked, are stolen
    ['^(is|are) (#PastTense|#Participle)', [present, passive]],
    // is being walked
    ['^(is|are) being (#PastTense|#Participle)', [present, passive]],
    // has been cleaned
    ['^has been (#PastTense|#Participle)', [present, passive]],
  ],
  'passive-future': [
    // will have been walked
    ['will have been (#PastTense|#Participle)', [future, passive, conditional]],
    // will be cleaned
    ['will be being? (#PastTense|#Participle)', [future, passive, conditional]],
  ],

  // === Conditional ===
  'present-conditional': [
    // would be walked
    ['would be #PastTense', [present, conditional]],
  ],
  'past-conditional': [
    // would have been walked
    ['would have been #PastTense', [past, conditional]],
  ],

  // ==== Auxiliary ===
  'auxiliary-future': [
    // going to drink
    ['(is|are|am|was) going to (#Infinitive|#PresentTense)', [future]],
  ],
  'auxiliary-past': [
    // he did walk
    ['^did #Infinitive$', [past, singular]],
    // used to walk
    ['^used to #Infinitive$', [past, complete]],
  ],
  'auxiliary-present': [
    // we do walk
    ['^(does|do) #Infinitive$', [present, complete, plural]],
  ],

  // === modals ===
  // he can walk
  //  'modal-infinitive':[ '^(can|must|should|shall) #Infinitive$' ],
  // he could have walked
  //  'modal-past':[ '^(could|must|should|shall) have #PastTense$', meta:[], ],
  //  'want-infinitive':[ '^(want|wants|wanted) to #Infinitive$' ],
}

let list = []
Object.keys(verbForms).map(k => {
  verbForms[k].forEach(a => {
    list.push({
      name: k,
      match: a[0],
      data: getData(a[1]),
    })
  })
})

export default list
