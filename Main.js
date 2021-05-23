const Readline = require('readline')
const Lexer = require("./Lexer")
const Parser = require("./Parser");

const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function read() {
    readline.question("KLang> ", a => {
        Lexer.parse(a)
            .then(r => {
                // console.log(r.tokens.map(x => x.toString()))
                Parser.parse(r.tokens, r.position)
                    .then(p => console.log(p.toString()))
                    .catch(e => console.log(`[${e.name}] ${e.message}`))
                    .finally(read)
            })
            .catch(e => console.log(`[${e.name}] ${e.message}`))
    })
}

read()