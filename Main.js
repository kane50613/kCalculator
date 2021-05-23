const Readline = require('readline')
const Lexer = require("./Lexer")

const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function read() {
    readline.question("KLang > ", a => {
        Lexer.parse(a)
            .then(r => {
                console.log(r)
                read()
            })
            .catch(e => {
                console.log(e.message)
            })
    })
}

read()