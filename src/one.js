import nlp from './nlp.js' // 5kb
import change from './1-one/change/plugin.js'
import match from './1-one/match/plugin.js'
import output from './1-one/output/plugin.js'
import pointers from './1-one/pointers/plugin.js'
import tag from './1-one/tag/plugin.js'
import tokenize from './1-one/tokenize/plugin.js'
import lookup from './1-one/lookup/plugin.js'
import cache from './1-one/cache/plugin.js'

nlp.extend(change) //0kb
nlp.extend(output) //0kb
nlp.extend(match) //10kb
nlp.extend(pointers) //2kb
nlp.extend(tag) //2kb
nlp.extend(tokenize) //7kb
nlp.plugin(cache) //~1kb
nlp.extend(lookup) //7kb

export default nlp // 40kb
