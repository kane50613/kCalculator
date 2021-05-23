const Token = require("./Token")
const Position = require("./Position")
const SyntaxErr = require('./Error/SyntaxErr')

class Lexer {
    constructor(input) {
        this.position = new Position()
        this.tokens = []
        this.input = input
    }

    static parse = async (input) => {
        return new Lexer(input.trim())._parse()
    }

    _parse = async () => {
        let char = this.input.substr(this.position.index, 1)

        if(char.length === 0)
            return this.tokens

        if(Token.DIGITS.includes(this.input.substr(this.position.index, 1))) {
            let _num = ''
            while(char.length > 0 && (Token.DIGITS.includes(char) || char === '.')) {
                _num += this.input.charAt(this.position.index)
                this.position.nextChar()
                char = this.input.substr(this.position.index, 1)
            }

            if(_num.includes('.')) {
                this.tokens.push(new Token(Token.FLOAT, _num))
                return this._parse()
            }
            this.tokens.push(new Token(Token.INT, _num))
            return this._parse()
        }

        if(char === ' ') {
            this.position.nextChar()
            return this._parse()
        }

        if(char === '\n') {
            this.position.nextLine()
            return this._parse()
        }

        if(char === '+') {
            this.tokens.push(new Token(Token.PLUS))
            this.position.nextChar()
            return this._parse()
        }
        if(char === '-') {
            this.tokens.push(new Token(Token.MINUS))
            this.position.nextChar()
            return this._parse()
        }
        if(char === '*') {
            this.tokens.push(new Token(Token.MINUS))
            this.position.nextChar()
            return this._parse()
        }
        if(char === '/') {
            this.tokens.push(new Token(Token.DIV))
            this.position.nextChar()
            return this._parse()
        }
        if(char === '(') {
            this.tokens.push(new Token(Token.LPAREN))
            this.position.nextChar()
            return this._parse()
        }
        if(char === ')') {
            this.tokens.push(new Token(Token.RPAREN))
            this.position.nextChar()
            return this._parse()
        }

        throw new SyntaxErr(this.position, char)
    }
}

module.exports = Lexer