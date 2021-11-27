import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/freeze] '

test('freeze-match :', function (t) {
  let doc = nlp(`yeah. one extra two match here three`)
  let m = doc.match('match here')
  m.freeze()
  doc.remove('extra')
  t.equal(m.text(), 'match here', here + 'match')
  t.end()
})

test('freeze-remove-before :', function (t) {
  let doc = nlp(`yeah. one extra two match here three`)
  let m = doc.match('match here')
  m.freeze()
  doc.remove('extra')
  doc.remove(m)
  t.equal(doc.eq(1).text(), 'one two three', here + 'remove')
  t.end()
})

test('freeze-remove-after :', function (t) {
  let doc = nlp(`yeah. one two match here extra three`)
  let m = doc.match('match here')
  m.freeze()
  doc.remove('extra')
  doc.remove(m)
  t.equal(doc.eq(1).text(), 'one two three', here + 'remove-after')
  t.end()
})

test('freeze-destroy-match :', function (t) {
  let doc = nlp(`yeah. one two match extra here three`)
  let m = doc.match('match extra here')
  m.freeze()
  doc.remove('extra')
  t.equal(m.found, false, here + 'broken-match')
  // ensure it now removes nothing
  doc.remove(m)
  t.equal(doc.has('match'), true, here + 'removed nothing')
  t.end()
})

test('freeze-change-multi :', function (t) {
  let doc = nlp(`extra extra match extra. extra one match two extra. match one`)
  let m = doc.match('match')
  m.freeze()
  doc.remove('extra')
  t.equal(doc.text(), 'match. one match two. match one', here + 'before remove')
  doc.remove(m)
  t.equal(doc.text(), 'one two. one', here + 'after remove')
  t.end()
})

test('freeze-split :', function (t) {
  let doc = nlp(`e before and m and after`)
  let m = doc.match('m')
  m.freeze()
  doc.remove('e')
  let res = doc.splitOn(m)
  t.deepEqual(res.out('array'), ['before and', 'm', 'and after'], here + 'freeze split')
  t.end()
})

test('freeze-sentence-remove :', function (t) {
  let doc = nlp(`extra. match.`)
  let m = doc.match('match').freeze()
  doc.remove('extra')
  t.equal(doc.match(m).text(), 'match', here + 'remove-sentence')
  t.end()
})