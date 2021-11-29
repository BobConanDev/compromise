import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/verb-toPresent] '

test('toPresent:', function (t) {
  let arr = [
    // known forms:
    ['he walked', 'he walks'],
    ['i walked', 'i walk'],
    ['we walked', 'we walk'],
    ['they walked', 'they walk'],
    ['the friends walked', 'the friends walk'],
    ['the friend walked', 'the friend walks'],
    ['our users walked', 'our users walk'],
    ['our user walked', 'our user walks'],
    ['the eye closed', 'the eye closes'],
    ['the eyes closed', 'the eyes close'],

    ['their colloseum will open', 'their colloseum opens'],
    ['their children will open', 'their children open'],

    ['he walks', 'he walks'],
    ['he walked', 'he walks'],
    ['he will walk', 'he walks'],
    ['he is walking', 'he is walking'],
    ['he was walking', 'he is walking'],
    ['i was walking', 'i am walking'],
    ['we were walking', 'we are walking'],
    ['i am walking', 'i am walking'],
    ['he will be walking', 'he is walking'],
    ['he really will be walking', 'he really is walking'],
    ['he will really be walking', 'he is really walking'],
    ['he will be really walking', 'he is really walking'],
    //
    ['he has walked', 'he has walked'],
    ['he had walked', 'he has walked'],
    ['he will have walked', 'he has walked'],
    ['he really will have walked', 'he really has walked'],
    ['he will really have walked', 'he has really walked'],
    ['he will have really walked', 'he has really walked'],

    ['he has been walking', 'he has been walking'],
    ['he had been walking', 'he has been walking'],
    ['he will have been walking', 'he has been walking'],
    ['he really will have been walking', 'he really has been walking'],
    ['he will really have been walking', 'he has really been walking'],
    ['he will have really been walking', 'he has really been walking'],
    ['he will have been really walking', 'he has been really walking'],

    ['he got walked', 'he is walked'],
    ['we got walked', 'we are walked'],
    ['i got walked', 'i am walked'],
    ['he was walked', 'he is walked'],
    ['i was walked', 'i am walked'],
    ['soldiers were walked', 'soldiers are walked'],

    ['i am being walked', 'i am being walked'],
    ['we are being walked', 'we are being walked'],
    ['was being walked', 'is being walked'],
    ['had been walked', 'is being walked'],
    // ['has been walked', 'is being walked'], //?
    ['have been walked', 'is being walked'],
    ['usually is really walked often', 'usually is really walked often'],
    ['were walked', 'are walked'],
    ['was being walked', 'is being walked'],
    // // ['has been walked', 'had been walked'],
    ['had been walked', 'is being walked'],
    // ['will have been walked', 'has been walked'],
    ['will be walked', 'is being walked'],
    ['he used to walk', 'he is walking'],
    ['he did walk', 'he does walk'],
    ['he must walk', 'he must walk'],
    ['he must have walked', 'he must walk'],
    ['he could have walked', 'he could walk'],

    ['would be walked', 'would be walked'],
    ['would have been walked', 'would be walked'],
    ['is going to walk', 'is walking'],
    ['did walk', 'does walk'],
    ['used to walk', 'is walking'],
    // ['do walk', 'did walk'],
    ['does walk', 'does walk'],

    // want-infinitive
    ['he wants to walk', 'he wants to walk'],
    ['he wanted to walk', 'he wants to walk'],
    ['he will want to walk', 'he wants to walk'],

    //past->pres
    ['i wrote', 'i write'],
    ['she wrote', 'she writes'],
    ['we wrote', 'we write'],
    ['they wrote', 'they write'],
    ['it wrote', 'it writes'],
    //future->pres
    ['i will go', 'i go'],
    ['she will go', 'she goes'],
    ['we will go', 'we go'],
    ['they will go', 'they go'],
    ['it will go', 'it goes'],
    //past+adv->pres
    ['i nearly slipped', 'i nearly slip'],
    ['she nearly slipped', 'she nearly slips'],
    ['we nearly slipped', 'we nearly slip'],
    ['they nearly slipped', 'they nearly slip'],
    ['it nearly slipped', 'it nearly slips'],
    //adv+past->pres
    ['i really learned from it', 'i really learn from it'],
    ['he really learned from it', 'he really learns from it'],
    ['everybody really learned from it', 'everybody really learns from it'],
    ['someone really learned from it', 'someone really learns from it'],
    ['eventually, i will learn from it', 'eventually, i learn from it'],
    // neg->pres
    // ['i did not really yell', 'i do not really yell'],
    // ['i do not really yell', 'i do not really yell'],
    // ['i never yell', 'i never yell'],
    // ['i never yelled', 'i never yelled'],
    ['i spoke quickly', 'i speak quickly'],
    ['i do not speak quickly', 'i do not speak quickly'],
    // ['he will never yell', 'he never yells'],
    // ['he never yelled', 'he never yelled'],
    ['he spoke quickly', 'he speaks quickly'],
    ['he did not speak quickly', 'he does not speak quickly'],
    ['we did not speak quickly', 'we do not speak quickly'],
    ['we spoke quickly', 'we speak quickly'],
    ['it spoke quickly', 'it speaks quickly'],
    // copula
    [`i am there`, 'i am there'],
    [`i was there`, 'i am there'],
    [`i will be there`, 'i am there'],
    [`spencer is there`, 'spencer is there'],
    [`spencer was there`, 'spencer is there'],
    [`spencer will be there`, 'spencer is there'],
    [`we are there`, 'we are there'],
    [`we were there`, 'we are there'],
    [`we will be there`, 'we are there'],
    // * -> pres
    [`i do not see it`, `i do not see it`],
    [`i see it clearly`, `i see it clearly`],
    [`i saw it clearly`, `i see it clearly`],
    [`he saw it`, `he sees it`],
    [`he saw it clearly`, `he sees it clearly`],
    [`he sees it clearly`, `he sees it clearly`],
    [`they see it clearly`, `they see it clearly`],
    [`they really saw it`, `they really see it`],
    [`he will really see it`, `he really sees it`],
    ['toronto barely started', 'toronto barely starts'],
    ['toronto hardly even started', 'toronto hardly even starts'],
    // ['toronto did not even start', 'toronto does not even start'],
    ['people will seldom start looking', 'people seldom start looking'],
    ['people seldom started looking', 'people seldom start looking'],
    ['he clearly did not suggest', 'he clearly does not suggest'],
    ['they clearly did not suggest', 'they clearly do not suggest'],
    ['the library did not provide', 'the library does not provide'],
    ['the library clearly will not provide', 'the library clearly does not provide'],
    // ['this union had disrupted', 'this union has disrupted'],
    ['john wrote everyday', 'john writes everyday'],
    // ['spencer and john wrote everyday', 'spencer and john write everyday'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.verbs().toPresentTense()
    t.equal(doc.text(), a[1], here + ' ' + a[0])
  })
  t.end()
})
