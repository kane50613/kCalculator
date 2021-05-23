const Readline = require('readline')
const Lexer = require("./Lexer")
const Parser = require("./Parser");

const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function read() {
    readline.question("KLang> ", a => {
        if(a.trim().length === 0)
            return read()
        Lexer.parse(a)
            .then(r => {
                console.log(`[LexerResult] ${r.tokens}`)
                Parser.parse(r.tokens, r.position)
                    .then(p => console.log(`[ParserResult] ${p}`))
                    .catch(e => console.log(`[${e.name}] ${e.message}`))
                    .finally(read)
            })
            .catch(e => console.log(`[${e.name}] ${e.message}`))
    })
}

read()