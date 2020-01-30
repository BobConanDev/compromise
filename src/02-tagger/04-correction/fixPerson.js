const maybeNoun =
  '(rose|robin|dawn|ray|holly|bill|joy|viola|penny|sky|violet|daisy|melody|kelvin|hope|mercedes|olive|jewel|faith|van|charity|miles|lily|summer|dolly|rod|dick|cliff|lane|reed|kitty|art|jean|trinity)'
const maybeVerb = '(pat|wade|ollie|will|rob|buck|bob|mark|jack)'
const maybeAdj = '(misty|rusty|dusty|rich|randy)'
const maybeDate = '(april|june|may|jan|august|eve)'
const maybePlace = '(paris|alexandria|houston|kobe|salvador|sydney)'

const fixPerson = function(doc) {
  // clues from honorifics
  let hon = doc.if('#Honorific')
  if (hon.found === true) {
    //mr Putin
    hon.match('(mr|mrs|ms|dr) (@titleCase|#Possessive)+').tag('#Person', 'mr-putin')
    //mr X
    hon.match('#Honorific #Acronym').tag('Person', 'Honorific-TitleCase')
    //remove single 'mr'
    hon.match('^#Honorific$').unTag('Person', 'single-honorific')
    //first general..
    hon.match('[(1st|2nd|first|second)] #Honorific', 0).tag('Honorific', 'ordinal-honorific')
  }

  //methods requiring a titlecase
  let title = doc.if('@titleCase')
  if (title.found === true) {
    title.match('#Acronym @titleCase').tagSafe('#Person', 'acronym-titlecase')
    //ludwig van beethovan
    title.match('@titleCase (van|al|bin) @titleCase').tagSafe('Person', 'titlecase-van-titlecase')
    //jose de Sucre
    title.match('@titleCase (de|du) la? @titleCase').tagSafe('Person', 'titlecase-van-titlecase')
    //Foo U Ford
    title
      .match('[#ProperNoun] #Person', 0)
      .notIf('@hasComma')
      .tagSafe('Person', 'proper-person')

    //pope francis
    title
      .match('(lady|queen|sister) @titleCase')
      .ifNo('#Date')
      .ifNo('#Honorific')
      .tag('#FemaleName', 'lady-titlecase')
    title
      .match('(king|pope|father) @titleCase')
      .ifNo('#Date')
      .tag('#MaleName', 'poe')

    // jean Foobar
    title.match(maybeNoun + ' #Acronym? @titleCase').tagSafe('Person', 'ray-smith')
    // rob Foobar
    title.match(maybeVerb + ' #Acronym? @titleCase').tag('Person', 'rob-smith')
    // rusty Foobar
    title.match(maybeAdj + ' #Acronym? @titleCase').tag('Person', 'rusty-smith')
    // june Foobar
    title.match(maybeDate + ' #Acronym? (@titleCase && !#Month)').tag('Person', 'june-smith')
  }

  let person = doc.if('#Person')
  if (person.found === true) {
    //Frank jr
    person.match('#Person (jr|sr|md)').tag('Person', 'person-honorific')
    //peter II
    person.match('#Person #Person the? #RomanNumeral').tag('Person', 'roman-numeral')
    //'Professor Fink', 'General McCarthy'
    person.match('#Honorific #Person').tag('Person', 'Honorific-Person')
    // 'john E rockefeller'
    person.match('#FirstName [/^[^aiurck]$/]', 0).tag(['Acronym', 'Person'], 'john-e')
    //Doctor john smith jr
    person.match('#Honorific #Person').tag('Person', 'honorific-person')
    //general pearson
    person
      .match('[(private|general|major|corporal|lord|lady|secretary|premier)] #Honorific? #Person', 0)
      .tag('Honorific', 'ambg-honorifics')
    //Morgan Shlkjsfne
    title
      .match('#Person @titleCase')
      .match('@titleCase #Noun')
      .tagSafe('Person', 'person-titlecase')
    //a bunch of ambiguous first names

    //Nouns: 'viola' or 'sky'
    let ambigNoun = person.if(maybeNoun)
    if (ambigNoun.found === true) {
      // ambigNoun.match('(#Determiner|#Adverb|#Pronoun|#Possessive) [' + maybeNoun + ']' ,0).tag('Noun', 'the-ray')
      ambigNoun.match(maybeNoun + ' #Person').tagSafe('Person', 'ray-smith')
    }

    //Verbs: 'pat' or 'wade'
    let ambigVerb = person.if(maybeVerb)
    if (ambigVerb === true) {
      ambigVerb.match('(#Modal|#Adverb) [' + maybeVerb + ']', 0).tag('Verb', 'would-mark')
      ambigVerb.match(maybeVerb + ' #Person').tag('Person', 'rob-smith')
    }

    //Adjectives: 'rusty' or 'rich'
    let ambigAdj = person.if(maybeAdj)
    if (ambigAdj.found === true) {
      ambigAdj.match('#Adverb [' + maybeAdj + ']', 0).tag('Adjective', 'really-rich')
      ambigAdj.match(maybeAdj + ' #Person').tag('Person', 'randy-smith')
    }

    //Dates: 'june' or 'may'
    let ambigDate = person.if(maybeDate)
    if (ambigDate.found === true) {
      ambigDate.match(maybeDate + ' #ProperNoun').tag(['FirstName', 'Person'], 'june-smith')
      ambigDate.match('(in|during|on|by|before|#Date) [' + maybeDate + ']', 0).tag('Date', 'in-june')
      ambigDate.match(maybeDate + ' (#Date|#Value)').tag('Date', 'june-5th')
    }

    //Places: paris or syndey
    let ambigPlace = person.if(maybePlace)
    if (ambigPlace.found === true) {
      ambigPlace.match('(in|near|at|from|to|#Place) [' + maybePlace + ']', 0).tagSafe('Place', 'in-paris')
      ambigPlace.match('[' + maybePlace + '] #Place', 0).tagSafe('Place', 'paris-france')
      // ambigPlace.match('[' + maybePlace + '] #Person').tagSafe('Person', 'paris-hilton')
    }

    //this one is tricky
    let al = person.if('al')
    if (al.found === true) {
      al.match('al (#Person|@titleCase)').tagSafe('#Person', 'al-borlen')
      al.match('@titleCase al @titleCase').tagSafe('#Person', 'arabic-al-arabic')
    }

    let firstName = person.if('#FirstName')
    if (firstName.found === true) {
      //ferdinand de almar
      firstName.match('#FirstName de #Noun').tag('#Person', 'firstname-de-noun')
      //Osama bin Laden
      firstName.match('#FirstName (bin|al) #Noun').tag('#Person', 'firstname-al-noun')
      //John L. Foo
      firstName.match('#FirstName #Acronym @titleCase').tag('Person', 'firstname-acronym-titlecase')
      //Andrew Lloyd Webber
      firstName.match('#FirstName #FirstName @titleCase').tag('Person', 'firstname-firstname-titlecase')
      //Mr Foo
      firstName.match('#Honorific #FirstName? @titleCase').tag('Person', 'Honorific-TitleCase')
      //peter the great
      firstName.match('#FirstName the #Adjective').tag('Person', 'determiner5')

      //very common-but-ambiguous lastnames
      firstName
        .match('#FirstName (green|white|brown|hall|young|king|hill|cook|gray|price)')
        .tag('#Person', 'firstname-maybe')

      //John Foo
      firstName
        .match('#FirstName @titleCase @titleCase?')
        .match('#Noun+')
        .tag('Person', 'firstname-titlecase')
      //Joe K. Sombrero
      firstName
        .match('#FirstName #Acronym #Noun')
        .ifNo('#Date')
        .tag('#Person', 'n-acro-noun')
        .lastTerm()
        .tag('#LastName', 'n-acro-noun')

      // Dwayne 'the rock' Johnson
      firstName
        .match('#FirstName [#Determiner #Noun] #LastName', 0)
        .tag('#NickName', 'first-noun-last')
        .tag('#Person', 'first-noun-last')

      //john bodego's
      firstName
        .match('#FirstName (#Singular|#Possessive)')
        .ifNo('(#Date|#Pronoun|#NickName)')
        .tag('#Person', 'first-possessive')
        .lastTerm()
        .tag('#LastName', 'first-possessive')

      // Firstname x (dangerous)
      let tmp = firstName
        .match('#FirstName (#Noun|@titleCase)')
        .ifNo('^#Possessive')
        .ifNo('#ClauseEnd .')
        .ifNo('#Pronoun')
      tmp.lastTerm().tag('#LastName', 'firstname-noun')
    }

    let lastName = person.if('#LastName')
    if (lastName.found === true) {
      //is foo Smith
      lastName.match('#Copula [(#Noun|#PresentTense)] #LastName', 0).tag('#FirstName', 'copula-noun-lastname')
      // x Lastname
      lastName
        .match('[#Noun] #LastName', 0)
        .canBe('#FirstName')
        .tag('#FirstName', 'noun-lastname')
      //ambiguous-but-common firstnames
      lastName
        .match(
          '[(will|may|april|june|said|rob|wade|ray|rusty|drew|miles|jack|chuck|randy|jan|pat|cliff|bill)] #LastName',
          0
        )
        .tag('#FirstName', 'maybe-lastname')
      //Jani K. Smith
      lastName
        .match('(@titleCase|#Singular) #Acronym? #LastName')
        .ifNo('#Date')
        .tag('#Person', 'title-acro-noun')
        .lastTerm()
        .tag('#LastName', 'title-acro-noun')
    }
  }

  return doc
}
module.exports = fixPerson
