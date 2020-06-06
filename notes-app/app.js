const fs = require('fs')

//fs.writeFileSync('doc.txt', 'This file was created with nodejs!')
fs.appendFileSync('doc.txt', '\nAnd this text was appended using appendFileSync!')