/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
// import text from '/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js'

// nlp.verbose('tagger')


// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())

// bug!
// let doc = nlp(`john walks`)
// let s = doc.sentences()
// s.toFutureTense().fullSentences()
// console.log(s)
// console.log(s.text())


let txt


// txt = " It was full of violence and gangs and kids cutting class, says Linda Ward, the school's principal."
// txt = 'They operate ships and banks.'
// txt = ' Bob handled quite brilliantly.'
// txt = 'But they, too, failed.'
//  txt= 'You really got me thinking, I enjoy reading this blog.'
//  txt= 'He clearly enjoyed, as governor, watching executions.'
// txt = 'He has clearly gone on enjoying '
//  txt= 'At one time, some thought he had been spotted in Iran.'
//  txt= 'Would dinner Thursday work instead.'
//  txt= 'Mark, I thought you would enjoy the comment about you.'
//  txt= 'Does that work for you?'
//  txt= 'Mark and Steve -'
//  txt= 'Thursday works for me.'
//  txt= 'Does that work?'
//  txt= 'CONGRATULATIONS !!!!!!!'
//  txt= 'Again, congratulations.'
//  txt= 'Congratulations.'
//  txt= 'Congratulations and good luck.'
//  txt= 'bob k'
//  txt= 'Day One Interviews Day Two Interviews'
//  txt= 'Sue and Jeff --'
//  txt= 'Are you playing golf?'
//  txt= 'Has Liz finished with gathering the documents?'
//  txt= 'Increases longevity.'
// txt = 'hey kido u made me smile'
// txt = 'spend the time training.'
//  txt= 'Hope it helps!'
//  txt= 'Do dogs enjoy watching T.V.?'
//  txt= 'Need Advice !?'
//  txt= 'The federal sites of Washington, DC.'
//  txt= 'Boiled WHITE rice and boiled chicken breast.'
// txt = 'The ship offers variety of things.'
// txt = 'many online sites offering the booking.'
// txt = 'I know this is going to be expensive.'
// txt = 'and it works!'
// txt = 'she needs to develop a personality!'
// txt = 'Provided me with warm blanket and has soft music playing.'
// txt = 'the woman running this place'

// txt = 'May, (2009) foo'
// txt = 'She is amazing.'



// let doc = nlp(txt).debug()


let regs = [{ word: 'may' }, { pre: '(' }]
nlp('may, (2019) foo').match(regs).debug()


// console.log(nlp.parseMatch('cool @hasComma'))
// bug 1
// txt = `he out-lived`
// txt = `he out lived`
// txt = `pseudo clean`
// txt = `he was anti cleaning`
// // txt = `he was anti cleaning`
// let doc = nlp(txt)
// console.log(doc.verbs().json()[0])
// doc.verbs().toFutureTense()
// doc.debug()



/*




(#Noun && @hasHyphen) #Verb







*/
