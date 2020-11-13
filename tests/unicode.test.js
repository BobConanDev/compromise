const test = require('tape')
const nlp = require('./_lib')

test('many-unicode', function (t) {
  let str = `✐✠✰❀❐❞❰➀➐➠➰✁✑✡✱❁❑❡❱➁➑➡➱✂✒✢✲❂❒❢❲➂➒➢➲✃✓✣✳❃❓❣❳➃➓➣➳✄✔✤✴❄❔❤❴➄➔➤➴✅✕✥✵❅❕❥❵➅➕➥➵✆✖✦✶❆❖❦❶➆➖➦➶✇✗✧✷❇❗❧❷➇➗➧➷✈✘✨✸❈❘❨❸➈➘➨➸✉✙✩✹❉❙❩❹➉➙➩➹✊✚✪✺❊❚❪❺➊➚➪➺✋✛✫✻❋❛❫❻➋➛➫➻✌✜✬✼❌❜❬❼➌➜➬➼✍✝✭✽❍❝❭❽➍➝➭➽✎✞✮✾❎❞❮❾➎➞➮➾✏✟✯✿❏❜❯❿➏➟➯➿😀😐😠😰🙀😁😑😡😱🙁😂😒😢😲🙂😃😓😣😳🙃😄😔😤😴🙄😅😕😥😵🙅😆😖😦😶🙆😇😗😧😷🙇😈😘😨😸🙈😉😙😩😹🙉😊😚😪😺🙊😋😛😫😻🙋😌😜😬😼🙌😍😝😭😽🙍😎😞😮😾🙎😏😟😯😿🙏,&、*.+-;<:>?=!—\($)%{@}〔〕₠₰₡₱₢₲₣₳₤₴₥₵₦₶₧₷₸₩₹₪₺₫₻€₼₭₽₮₾₯₿`
  let doc = nlp(str)
  t.equal(doc.text(), str, 'identical-text')
  t.equal(doc.length, 1, 'one-sentence')
  t.equal(doc.terms().length, 1, 'one-term')
  t.end()
})

test('em-dashes', function (t) {
  let str = 'text—text'
  let doc = nlp(str)
  t.equal(doc.text() === str, true, 'emdash')
  t.end()
})

// this section is very cursed
test('zero-width-chars', function (t) {
  let str = `before​ after` //this has a zero-width character
  // let str = 'before after'
  let doc = nlp(str)
  t.equal(doc.text(), str, 'zero-width passes-through')
  let json = doc.json({ terms: { normal: true } })
  let before = json[0].terms[0]
  t.equal(before.normal, 'before', 'normalized-out')
  t.equal(before.post, ' ', 'normal whitespace')
  t.end()
})
