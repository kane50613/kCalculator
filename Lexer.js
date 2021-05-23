const Token = require("./Token")

class Lexer {
    static parse(input) {
        return this._parse(input.trim(), [], 0)
    }

    static _parse(input, tokens, index) {
        if(input.substr(index, 1).length === 0)
            return tokens

        if(Token.DIGITS.includes(input.substr(index, 1))) {
            let _num = '', _i = index
            while(input.substr(_i, 1).length > 0 && (Token.DIGITS.includes(input.substr(_i, 1)) || input.substr(_i, 1) === '.')) {
                _num += input.charAt(_i)
                _i++
            }

            if(_num.includes('.'))
                return this._parse(input, [...tokens, new Token(Token.FLOAT, _num)], _i)
            return this._parse(input, [...tokens, new Token(Token.INT, _num)], _i)
        }

        if(input.substr(index, 1) === '+')
            return this._parse(input, [...tokens, new Token(Token.PLUS)], index + 1)
        if(input.substr(index, 1) === '-')
            return this._parse(input, [...tokens, new Token(Token.MINUS)], index + 1)
        if(input.substr(index, 1) === '*')
            return this._parse(input, [...tokens, new Token(Token.MUL)], index + 1)
        if(input.substr(index, 1) === '/')
            return this._parse(input, [...tokens, new Token(Token.DIV)], index + 1)
        if(input.substr(index, 1) === '(')
            return this._parse(input, [...tokens, new Token(Token.LPAREN)], index + 1)
        if(input.substr(index, 1) === ')')
            return this._parse(input, [...tokens, new Token(Token.RPAREN)], index + 1)
        return this._parse(input, [...tokens, new Token(Token.UNKNOWN)], index + 1)
    }
}

module.exports = Lexer