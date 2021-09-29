/* eslint-disable no-console */
import fs from 'fs'
import { pack } from 'efrt'
import lexicon from '../lib/lexicon/index.js'
import switches from '../lib/switches/index.js'
import senses from '../lib/senses/index.js'

const steps = [
  {
    label: 'lexicon',
    path: './src/two/preTagger/model/lexicon/_data.js',
    compress: function () {
      let packed = {}
      //turn them into a series of flat-arrays
      Object.keys(lexicon).forEach(word => {
        let tags = lexicon[word]
        if (typeof tags === 'string') {
          tags = [tags]
        }
        tags.forEach(tag => {
          packed[tag] = packed[tag] || []
          packed[tag].push(word)
        })
      })
      //pack each array into a tiny string
      Object.keys(packed).forEach(tag => {
        packed[tag] = pack(packed[tag])
      })
      return packed
    },
  },
  {
    label: 'switches',
    path: './src/two/preTagger/model/switches/_data.js',
    compress: function () {
      Object.keys(switches).forEach(k => {
        switches[k] = pack(switches[k])
      })
      return switches
    },
  },
  {
    label: 'senses',
    path: './src/four/sense/model/_data.js',
    compress: function () {
      Object.keys(senses).forEach(ambig => {
        senses[ambig].forEach(sense => {
          sense.words = pack(sense.words)
        })
      })
      return senses
    },
  },
]

// run through all our steps
steps.forEach(obj => {
  console.log(`\n 🕑  - packing ${obj.label}..`)
  const packed = obj.compress()

  //write it to a file in ./src
  const banner = `// generated in ./lib/${obj.label}\n`
  fs.writeFileSync(obj.path, banner + 'export default ' + JSON.stringify(packed, null, 2), 'utf8')

  //get filesize
  const stats = fs.statSync(obj.path)
  let size = (stats['size'] / 1000.0).toFixed(1)
  console.log(`       - ${obj.label} is  ` + size + 'k\n')
})
