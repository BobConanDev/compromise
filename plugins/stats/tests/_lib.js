/* eslint-disable no-console */
import build from '../../../builds/one/compromise-one.mjs'
import src from '../../../src/one.js'
let nlp = src
import plugin from '../src/plugin.js'

// import dateBuild from '../builds/compromise-speech.js'
if (process.env.TESTENV === 'prod') {
  console.warn('== production build test 🚀 ==')
  nlp = build
}
nlp.plugin(plugin)
export default nlp
