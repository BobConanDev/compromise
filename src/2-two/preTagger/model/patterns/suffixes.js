//just a foolish lookup of known suffixes
const Adj = 'Adjective'
const Inf = 'Infinitive'
const Pres = 'PresentTense'
const Sing = 'Singular'
const Past = 'PastTense'
const Avb = 'Adverb'
const Plrl = 'Plural'
const Actor = 'Actor'
const Vb = 'Verb'
const Noun = 'Noun'
const Last = 'LastName'
const Modal = 'Modal'
const Place = 'Place'

export default [
  null,
  null,
  {
    //2-letter
    ea: Sing,
    ia: Noun,
    ic: Adj,
    ly: Avb,
    "'n": Vb,
    "'t": Vb,
  },
  {
    //3-letter
    oed: Past,
    ued: Past,
    xed: Past,
    ' so': Avb,
    "'ll": Modal,
    "'re": 'Copula',
    azy: Adj,
    eer: Noun,
    end: Vb,
    ped: Past,
    ffy: Adj,
    ify: Inf,
    ing: 'Gerund',
    ize: Inf,
    lar: Adj,
    mum: Adj,
    nes: Pres,
    nny: Adj,
    oid: Adj,
    ous: Adj,
    que: Adj,
    rol: Sing,
    sis: Sing,
    zes: Pres,
    eld: Past,
  },
  {
    //4-letter
    amed: Past,
    aped: Past,
    ched: Past,
    lked: Past,
    nded: Past,
    mned: Adj,
    cted: Past,
    dged: Past,
    ield: Sing,
    akis: Last,
    cede: Inf,
    chuk: Last,
    czyk: Last,
    ects: Pres,
    ends: Vb,
    enko: Last,
    ette: Sing,
    fies: Pres,
    fore: Avb,
    gate: Inf,
    gone: Adj,
    ices: Plrl,
    ints: Plrl,
    ines: Plrl,
    ions: Plrl,
    less: Avb,
    llen: Adj,
    made: Adj,
    nsen: Last,
    oses: Pres,
    ould: Modal,
    some: Adj,
    sson: Last,
    tage: Inf,
    tion: Sing,
    tive: Adj,
    tors: Noun,
    vice: Sing,
  },
  {
    //5-letter
    tized: Past,
    urned: Past,
    eased: Past,
    ances: Plrl,
    bound: Adj,
    ettes: Plrl,
    fully: Avb,
    ishes: Pres,
    ities: Plrl,
    marek: Last,
    nssen: Last,
    ology: Noun,
    ports: Plrl,
    rough: Adj,
    tches: Pres,
    tieth: 'Ordinal',
    tures: Plrl,
    wards: Avb,
    where: Avb,
  },
  {
    //6-letter
    auskas: Last,
    keeper: Actor,
    logist: Actor,
    teenth: 'Value',
  },
  {
    //7-letter
    opoulos: Last,
    borough: Place,
    sdottir: Last, //swedish female
  },
]
