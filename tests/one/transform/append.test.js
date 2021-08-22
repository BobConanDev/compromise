import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/append] '

test('append parent', function (t) {
  let doc = nlp(`one two three`)
  doc.append('four five')
  t.equal(doc.text(), 'one two three four five', here + 'appended in parent')
  t.end()
})

test('append one child', function (t) {
  let doc = nlp(`one two three`)
  let m = doc.match('three')
  m.append('four five')
  t.equal(doc.text(), 'one two three four five', here + 'appended in parent')
  t.end()
})

test('append multi', function (t) {
  let doc = nlp('one two. three four')
  doc.append('oooo')
  t.equal(doc.text(), 'one two oooo. three four oooo', here + 'append multi')
  t.end()
})

test('append two children', function (t) {
  let doc = nlp(`one two three`)
  let m = doc.match('two three')
  let m2 = m.match('three')
  m2.append('four five')
  t.equal(m.text('normal'), 'two three four five', here + 'append in child 1')
  t.equal(m2.text('normal'), 'three four five', here + 'append in child 2')
  t.equal(doc.text(), 'one two three four five', here + 'appended in parent')
  t.end()
})

test('append in middle', function (t) {
  let doc = nlp(`one two three six`)
  let m = doc.match('three').append('four five')
  t.equal(m.text('normal'), 'three four five', here + 'append in child 1')
  t.equal(doc.text(), 'one two three four five six', here + 'inserted in parent')
  t.end()
})

test('append in middle many children', function (t) {
  let doc = nlp(`one two three six`)
  let mx = doc.match('one two three').match('three').match('.').match('three')
  mx.append('four five')
  t.equal(mx.text('normal'), 'three four five', here + 'append in child n')
  t.equal(doc.text(), 'one two three four five six', here + 'inserted in parent')
  t.end()
})

test('append check false-positives', function (t) {
  let doc = nlp(`one two three five`)
  let one = doc.match('one')
  let twoThree = doc.match('two three')
  let noFour = doc.match('four')
  let five = doc.match('five')
  doc.match('three').append('four')
  t.equal(one.text('normal'), 'one', here + 'not in one')
  t.equal(twoThree.text('normal'), 'two three', here + 'not in twoThree')
  t.equal(noFour.text('normal'), '', here + 'still no four')
  t.equal(five.text('normal'), 'five', here + 'not in five')
  t.equal(doc.text(), 'one two three four five', here + 'inserted in parent')
  t.equal(doc.match('four').text('normal'), 'four', here + 'now has four')
  t.equal(doc.match('four five').text('normal'), 'four five', here + 'now has four-five')
  t.equal(doc.match('. four').text('normal'), 'three four', here + 'now has three four')
  t.end()
})
