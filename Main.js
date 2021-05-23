const Readline = require('readline')
const Lexer = require("./Lexer")

const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function read() {
    readline.question("KLang > ", a => {
        console.log(Lexer.parse(a))
        read()
    })
}

read()