import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/is-has] '

test('is-has', function (t) {
  let arr = [
    ["John's nuts about Georgia", 'is'],
    ["john's closed tasks", 'has'],
    ["Jamaica's growing rapidly", 'is'],
    ["John's quickly running", 'is'],
    ["The cat's asleep on the windowsill", 'is'],
    ["She's been working all day", 'has'],
    ["It's a beautiful morning", 'is'],
    ["The team's won the championship", 'has'],
    ["He's studying for the exam", 'is'],
    ["Mary's visited Paris before", 'has'],
    ["The baby's crying in the crib", 'is'],
    ["The project's completed on time", 'has'],
    ["It's not what it seems", 'is'],
    ["The dog's chasing its tail", 'is'],
    ["She's never been to Asia", 'has'],
    ["The car's parked in the driveway", 'is'],
    ["He's a talented musician", 'is'],
    ["The book's missing a few pages", 'is'],
    ["They're convinced he's innocent", 'is'],
    ["The company's expanding globally", 'is'],
    ["She's got a lot of friends", 'has'],
    ["It's your turn to speak", 'is'],
    ["The movie's already started", 'has'],
    ["He's always on time", 'is'],
    ["The software's being updated", 'is'],
    ["She's reached her goal", 'has'],
    ["It's not what it used to be", 'is'],
    ["The plane's just landed", 'has'],
    ["She's the one who called", 'has'],
    ["The coffee's too hot", 'is'],
    ["He's never met her before", 'has'],
    ["The baby's first steps are exciting", 'is'],
    ["The assignment's due tomorrow", 'is'],
    ["She's a talented artist", 'is'],
    ["The food's ready to be served", 'is'],
    ["He's the one in charge", 'is'],
    ["The project's already started", 'has'],
    ["She's lost her keys again", 'has'],
    ["The concert's sold out", 'is'],
    ["He's got a new job", 'has'],
    ["The cake's been eaten", 'has'],
    ["She's been a great friend", 'has'],
    ["It's not as easy as it looks", 'is'],
    ["The meeting's scheduled for 3 PM", 'is'],
    ["He's very talented", 'is'],
    ["The sun's setting", 'is'],
    ["John's guitar is in the corner", '#Possessive'],
    ["The cat's eyes sparkled in the moonlight", '#Possessive'],
    ["My sister's wedding is next month", '#Possessive'],
    ["The car's engine roared to life", '#Possessive'],
    ["The explorer's map guided the journey", '#Possessive'],
    ["The lawyer's argument won the case", '#Possessive'],
    ["She's finished her work", 'has'],
    ["The car's out of gas", 'is'],
    ["He's feeling much better", 'is'],
    ["The package's arrived", 'has'],
    ["She's never seen such a beautiful sunset", 'has'],
    ["The movie's already started", 'has'],
    ["He's always been a good friend", 'has'],
    ["The cat's sleeping on the roof", 'is'],
    ["She's got a new car", 'has'],
    ["It's raining outside", 'is'],
    ["The project's behind schedule", 'is'],
    ["He's an excellent cook", 'is'],
    ["The baby's learned to crawl", 'has'],
    ["She's never tasted sushi before", 'has'],
    ["The book's missing a few chapters", 'is'],
    ["It's important to stay focused", 'is'],
    ["The team's won every game this season", 'has'],
    ["She's always been a fast learner", 'has'],
    ["The computer's crashed again", 'has'],
    ["He's lived here for years", 'has'],
    ["The store's closed on Sundays", 'is'],
    ["She's finished her degree", 'has'],
    ["The concert's starting soon", 'is'],
    ["He's become a successful entrepreneur", 'has'],
    ["The cake's already been eaten", 'has'],
    ["She's excited about the trip", 'is'],
    ["The train's already left the station", 'has'],
    ["He's the captain of the team", 'is'],
    ["The dog's barking in the backyard", 'is'],
    ["She's always been a good listener", 'has'],
    ["The package's arrived on time", 'has'],
    ["He's never seen such a beautiful sunset", 'has'],

    ["John's house is very warm", '#Possessive'],
    ["The captain's chair was empty", '#Possessive'],
    ["The baby's room needs redecorating", '#Possessive'],
    ["The mountain's peak is covered in snow", '#Possessive'],
    ["The student's backpack is in the hallway", '#Possessive'],
    ["The coffee's aroma filled the room", '#Possessive'],
    ["The city's skyline is breathtaking", '#Possessive'],
    ["The building's foundation is strong", '#Possessive'],
    ["The cat's fur is soft", '#Possessive'],
    ["The dog's collar is missing", '#Possessive'],
    ["The baby's first steps are exciting", '#Possessive'],
    ["The concert's starting soon", '#Possessive'],
    ["The plane's just landed", '#Possessive'],
    ["The food's ready to be served", '#Possessive'],
    ["The package's arrived on time", '#Possessive'],
    ["The car's engine needs maintenance", '#Possessive'],
    ["The company's success is remarkable", '#Possessive'],
    ["The dog's behavior is unpredictable", '#Possessive'],
    ["The child's imagination is vivid", '#Possessive'],
    ["The teacher's guidance is invaluable", '#Possessive'],
    ["The project's completion is imminent", '#Possessive'],
    ["The team's unity is commendable", '#Possessive'],
    ["The cat's eyes gleamed in the darkness", '#Possessive'],
    ["The company's headquarters are in the city", '#Possessive'],
    ["The student's understanding is impressive", '#Possessive'],
    ["The manager's decision was unexpected", '#Possessive'],
    ["The garden's beauty is captivating", '#Possessive'],
    ["The artist's technique is unique", '#Possessive'],
    ["The captain's leadership is crucial", '#Possessive'],
    ["The doctor's advice was helpful", '#Possessive'],
    ["The child's innocence is heartwarming", '#Possessive'],
    ["The scientist's research is groundbreaking", '#Possessive'],
    ["The musician's talent is evident", '#Possessive'],
    ["The author's storytelling is captivating", '#Possessive'],
    ["The chef's recipe is a closely guarded secret", '#Possessive'],
    ["The athlete's dedication is inspiring", '#Possessive'],
    ["The architect's vision is reflected in the design", '#Possessive'],
    ["The student's question was thought-provoking", '#Possessive'],
    ["The lawyer's argument was persuasive", '#Possessive'],
    ["The nurse's care was comforting", '#Possessive'],
    ["The scientist's experiment yielded interesting results", '#Possessive'],
    ["The CEO's decision impacted the entire company", '#Possessive'],
    ["The explorer's journey was filled with challenges", '#Possessive'],
    ["The professor's lecture was enlightening", '#Possessive'],
    ["The journalist's story was front-page news", '#Possessive'],
    ["The farmer's crops were ready for harvest", '#Possessive'],
    ["The engineer's design was innovative", '#Possessive'],
    ["The architect's plans were carefully drawn", '#Possessive'],
    ["The detective's intuition was sharp", '#Possessive'],
    ["The artist's gallery displayed stunning works", '#Possessive'],
    ["The librarian's knowledge of books was vast", '#Possessive'],
    ["The company's expanding rapidly", 'is'],
    ["She's been to Europe several times", 'has'],
    ["The car's parked in the garage", 'is'],
    ["He's the one who called", 'has'],
    ["The weather's getting colder", 'is'],
    ["She's got a talent for singing", 'has'],
    ["The meeting's been rescheduled", 'has'],
    ["He's a professional photographer", 'is'],
    ["The project's almost complete", 'is'],
    ["She's already finished her homework", 'has'],
    ["The coffee's too hot to drink", 'is'],
    ["He's the one in charge", 'is'],
    ["The sun's shining brightly", 'is'],
    ["She's never been to Asia", 'has'],
    ["The concert's sold out", 'is'],
    ["He's feeling much better", 'is'],
    ["The plane's just landed", 'has'],
    ["She's got a lot of experience", 'has'],
    ["The book's been on the bestseller list", 'has'],
    ["He's never met her before", 'has'],
    ["The assignment's due tomorrow", 'is'],
    ["She's always been a hard worker", 'has'],
    ["The car's out of gas", 'is'],
    ["He's a talented musician", 'is'],
    ["The food's ready to be served", 'is'],
    ["She's the one who organized the event", 'has'],

    ["The cat's hiding under the table", 'is'],
    ["John's finished his homework", 'has'],
    ["The project's behind schedule", 'is'],
    ["She's got a new car", 'has'],
    ["It's your turn to speak", 'is'],
    ["The book's missing a few pages", 'is'],
    ["He's the one in charge", 'is'],
    ["The concert's sold out", 'is'],
    ["She's lost her keys again", 'has'],
    ["The coffee's too hot", 'is'],
    ["John's house is very warm", '#Possessive'],
    ["The captain's chair was empty", '#Possessive'],
    ["The baby's room needs redecorating", '#Possessive'],
    ["The car's engine is making a strange noise", 'is'],
    ["The team's won every game this season", 'has'],
    ["The mountain's peak is covered in snow", '#Possessive'],
    ["The student's backpack is in the hallway", '#Possessive'],
    ["The movie's already started", 'has'],
    ["He's a talented musician", 'is'],
    ["The store's closed on Sundays", 'is'],
    ["She's got a lot of experience", 'has'],
    ["The company's expanding globally", 'is'],
    ["It's not what it used to be", 'is'],
    ["The software's being updated", 'is'],
    ["She's the one who called", 'has'],
    ["The coffee's aroma filled the room", '#Possessive'],
    ["The city's skyline is breathtaking", '#Possessive'],
    ["The baby's first steps are exciting", 'is'],
    ["The assignment's due tomorrow", 'is'],
    ["She's always been a hard worker", 'has'],
    ["The concert's starting soon", 'is'],
    ["The plane's just landed", 'has'],
    ["The food's ready to be served", 'is'],
    ["He's never met her before", 'has'],
    ["The package's arrived on time", 'has'],
    ["She's never seen such a beautiful sunset", 'has'],
    ["The building's foundation is strong", '#Possessive'],
    ["The cat's fur is soft", '#Possessive'],
    ["The dog's collar is missing", '#Possessive'],
    ["The company's CEO is giving a speech", '#Possessive'],
    ["The team's strategy is well-thought-out", '#Possessive'],
    ["The child's laughter is infectious", '#Possessive'],
    ["The garden's flowers are in full bloom", '#Possessive'],
    ["The novel's plot is intriguing", '#Possessive'],
    ["The scientist's discovery is groundbreaking", '#Possessive'],
    ["John's car is parked outside", '#Possessive'],
    ["The cat's playful antics amused everyone", '#Possessive'],
    ["My sister's birthday is next week", '#Possessive'],
    ["The car's sleek design caught everyone's attention", '#Possessive'],
    ["Baby's first steps are always memorable", '#Possessive'],
    ["Professor's office hours are posted on the door", '#Possessive'],
    ["Athlete's dedication often leads to success", '#Possessive'],
    ["Artist's creative process is unique to each individual", '#Possessive'],
    ["Restaurant's signature dish is a customer favorite", '#Possessive'],
    ["Student's question sparked an interesting discussion", '#Possessive'],
    ["The artist's painting is on display", '#Possessive'],
    ["The captain's orders were clear", '#Possessive'],
    ["The doctor's diagnosis was accurate", '#Possessive'],
    ["The professor's lecture was informative", '#Possessive'],
    ["The city's population is growing", '#Possessive'],
    ["The dog's barking in the backyard", 'is'],
    ["She's always been a fast learner", 'has'],
    ["The car's out of gas", 'is'],
    ["He's a professional photographer", 'is'],
    ["The food's ready to be served", 'is'],
    ["She's the one who organized the event", 'has'],
    ["The weather's getting colder", 'is'],
    ["She's got a talent for singing", 'has'],
    ["The meeting's scheduled for 3 PM", 'is'],
    ["He's very talented", 'is'],
    ["The sun's setting", 'is'],
    ["She's finished her work", 'has'],
    ["The car's parked in the garage", 'is'],
    ["He's never let us down before", 'has'],
    ["The package's arrived", 'has'],
    ["She's never been to Asia", 'has'],
    ["The concert's sold out", 'is'],
    ["He's feeling much better", 'is'],
    ["The plane's just landed", 'has'],
    ["She's got a lot of experience", 'has'],
    ["The book's been on the bestseller list", 'has'],
    ["He's never met her before", 'has'],
    ["The assignment's due tomorrow", 'is'],
    ["She's always been a hard worker", 'has'],
    ["The car's engine needs maintenance", '#Possessive'],
    ["The company's success is remarkable", '#Possessive'],
    ["The dog's behavior is unpredictable", '#Possessive'],
    ["The child's imagination is vivid", '#Possessive'],
    ["The teacher's guidance is invaluable", '#Possessive'],
    ["The project's completion is imminent", '#Possessive'],
    ["The team's unity is commendable", '#Possessive'],
    ["The cat's eyes gleamed in the darkness", '#Possessive'],
    ["The company's headquarters are in the city", '#Possessive'],
    ["The student's understanding is impressive", '#Possessive'],
    ["The manager's decision was unexpected", '#Possessive'],
    ["The garden's beauty is captivating", '#Possessive'],
    ["The artist's technique is unique", '#Possessive'],
    ["The captain's leadership is crucial", '#Possessive'],
    ["The doctor's advice was helpful", '#Possessive'],
    ["The child's innocence is heartwarming", '#Possessive'],
    ["The scientist's research is groundbreaking", '#Possessive'],
    ["The musician's talent is evident", '#Possessive'],
    ["The author's storytelling is captivating", '#Possessive'],
    ["The chef's recipe is a closely guarded secret", '#Possessive'],
    ["The athlete's dedication is inspiring", '#Possessive'],
    ["The architect's vision is reflected in the design", '#Possessive'],
    ["The student's question was thought-provoking", '#Possessive'],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    t.equal(doc.has(a[1]), true, here + a[0])
  })
  t.end()
})
