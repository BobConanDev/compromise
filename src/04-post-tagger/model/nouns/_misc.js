export default [
  //'more' is not always an adverb
  { match: 'more #Noun', tag: 'Noun', reason: 'more-noun' },
  { match: '(right|rights) of .', tag: 'Noun', reason: 'right-of' },
  { match: 'a [bit]', group: 0, tag: 'Noun', reason: 'bit-2' },

  //some pressing issues
  { match: 'some [#Verb] #Plural', group: 0, tag: 'Noun', reason: 'determiner6' },
  // my first thought
  { match: '#Possessive #Ordinal [#PastTense]', group: 0, tag: 'Noun', reason: 'first-thought' },
  //the nice swim
  { match: '(the|this|those|these) #Adjective [#Verb]', group: 0, tag: 'Noun', reason: 'the-adj-verb' },
  // the truly nice swim
  { match: '(the|this|those|these) #Adverb #Adjective [#Verb]', group: 0, tag: 'Noun', reason: 'determiner4' },
  //the wait to vote
  { match: 'the [#Verb] #Preposition .', group: 0, tag: 'Noun', reason: 'determiner1' },
  //a sense of
  { match: '#Determiner [#Verb] of', group: 0, tag: 'Noun', reason: 'the-verb-of' },
  //the threat of force
  { match: '#Determiner #Noun of [#Verb]', group: 0, tag: 'Noun', reason: 'noun-of-noun' },

  //'u' as pronoun
  { match: '#Conjunction [u]', group: 0, tag: 'Pronoun', reason: 'u-pronoun-2' },
  { match: '[u] #Verb', group: 0, tag: 'Pronoun', reason: 'u-pronoun-1' },
  //the western line
  {
    match: '#Determiner [(western|eastern|northern|southern|central)] #Noun',
    group: 0,
    tag: 'Noun',
    reason: 'western-line',
  },
  //linear algebra
  {
    match: '(#Determiner|#Value) [(linear|binary|mobile|lexical|technical|computer|scientific|formal)] #Noun',
    group: 0,
    tag: 'Noun',
    reason: 'technical-noun',
  },
  //air-flow
  { match: '(#Noun && @hasHyphen) #Verb', tag: 'Noun', reason: 'hyphen-verb' },
  //is no walk
  { match: 'is no [#Verb]', group: 0, tag: 'Noun', reason: 'is-no-verb' },
  //different views than
  { match: '[#Verb] than', group: 0, tag: 'Noun', reason: 'correction' },
  //do so
  { match: 'do [so]', group: 0, tag: 'Noun', reason: 'so-noun' },
  // what the hell
  { match: '#Determiner [(shit|damn|hell)]', group: 0, tag: 'Noun', reason: 'swears-noun' },
  // the staff were
  { match: '(the|these) [#Singular] (were|are)', group: 0, tag: 'Plural', reason: 'singular-were' },
  // a comdominium, or simply condo
  { match: `a #Noun+ or #Adverb+? [#Verb]`, group: 0, tag: 'Noun', reason: 'noun-or-noun' },
  // walk the walk
  { match: '(the|those|these|a|an) #Adjective? [#Infinitive]', group: 0, tag: 'Noun', reason: 'det-inf' },
  { match: '(the|those|these|a|an) #Adjective? [#PresentTense]', group: 0, tag: 'Noun', reason: 'det-pres' },
  { match: '(the|those|these|a|an) #Adjective? [#PastTense]', group: 0, tag: 'Noun', reason: 'det-past' },

  // ==== Actor ====
  //Aircraft designer
  { match: '#Noun #Actor', tag: 'Actor', reason: 'thing-doer' },
  // co-founder
  { match: `co #Noun`, tag: 'Actor', reason: 'co-noun' },

  // ==== Singular ====
  //the sun
  { match: '#Determiner [sun]', group: 0, tag: 'Singular', reason: 'the-sun' },
  //did a 900, paid a 20
  { match: '#Verb (a|an) [#Value]', group: 0, tag: 'Singular', reason: 'did-a-value' },
  //'the can'
  { match: 'the [(can|will|may)]', group: 0, tag: 'Singular', reason: 'the can' },

  // ==== Possessive ====
  //spencer kelly's
  { match: '#FirstName #Acronym? (#Possessive && #LastName)', tag: 'Possessive', reason: 'name-poss' },
  //Super Corp's fundraiser
  { match: '#Organization+ #Possessive', tag: 'Possessive', reason: 'org-possessive' },
  //Los Angeles's fundraiser
  { match: '#Place+ #Possessive', tag: 'Possessive', reason: 'place-possessive' },
]
