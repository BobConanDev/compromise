const nlp = require('./src/index')
nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/typeahead/src'))
// nlp.extend(require('./plugins/dates/src'))
// nlp.extend(require('./plugins/sentences/src'))
nlp.verbose(true)
// nlp.typeahead({ march: 'Date' }, { min: 1, safe: false })
// let str =
//   '/^(?=d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]d)?dd(?:(?=\x20d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]d){0,2}(\x20[AP]M))|([01]d|2[0-3])(:[0-5]d){1,2})?$/'
// let r = new RegExp(str)
// // console.log(r)
// let res = nlp.parseMatch(`start (one|two|three four)? end`)
// console.log(res)

// let doc = nlp.tokenize('16 marc')
// doc.match()

// const doc = nlp('i was walking')
// const m = doc.normalize({
//   verbs: true,
// })
// m.debug()

let doc = nlp('120 öre').debug()
// doc.match('(been|am|#Auxiliary) #Gerund').debug()
doc.money().debug()

const prefetch = async function () {
  let docs = []
  for (let i = 0; i <= 5; i += 1) {
    let txt = await fetch(`https://unpkg.com/nlp-corpus@3.3.0/builds/nlp-corpus-${i}.json`)
  }
}
