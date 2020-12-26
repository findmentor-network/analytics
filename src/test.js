const db = require('./db')

db.add({ href: 'https://google.com' })
db.add({ href: 'https://google.com/' })
db.add({ href: 'https://google.com/test' })
db.add({ href: 'https://google.com/abc' })
db.add({ href: 'https://google.com/abc' })
db.add({ href: 'https://google.com/abc' })

// console.log(db.all());

console.log(db.get('google.com'))
console.log(db.get('google.com/abc'))
