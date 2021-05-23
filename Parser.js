const Token = require("./Token");
const BinaryNode = require("./Node/BinaryNode");
const NumberNode = require("./Node/NumberNode");
const SyntaxErr = require("./Error/SyntaxErr");

class Parser {
    static parse = async (tokens, position) => {
        if(tokens.filter(x => x.type === Token.LPAREN).length > tokens.filter(x => x.type === Token.RPAREN))
            throw new SyntaxErr(position, null, 'missing `)`')
        if(tokens.filter(x => x.type === Token.LPAREN).length < tokens.filter(x => x.type === Token.RPAREN))
            throw new SyntaxErr(position, null, 'missing `(`')

        if(tokens.findIndex(x => x.type === Token.RPAREN) < tokens.findIndex(x => x.type === Token.LPAREN))
            throw new SyntaxErr(position, null, 'missing `(`')

        let lParen = tokens.findIndex(x => x.type === Token.LPAREN),
            rParen = Parser.getArrayFromTo(tokens, lParen).findIndex(x => x.type === Token.RPAREN)
        if(lParen !== -1)
            tokens = Parser.replaceArrayFromTo(
                tokens,
                lParen,
                rParen,
                await this.parse(Parser.getArrayFromTo(tokens, lParen + 1, rParen), position)
            )

        if(tokens.length === 1) {
            if(tokens[0]?.type === Token.INT || tokens[0]?.type === Token.FLOAT)
                return new NumberNode(tokens[0].value)
            else throw new SyntaxErr(position, tokens[0].toString())
        }

        if(tokens.length < 3)
            throw new SyntaxErr(position, tokens[1].toString())

        const makeNode = async pos => new BinaryNode(
            tokens[pos - 1] instanceof BinaryNode || tokens[pos - 1] instanceof NumberNode ?
                tokens[pos - 1] :
                await this.parse(this.getArrayFromTo(tokens, 0, pos), position),
            tokens[pos],
            tokens[pos + 1] instanceof BinaryNode || tokens[pos + 1] instanceof NumberNode ?
                tokens[pos + 1] :
                await this.parse(this.getArrayFromTo(tokens, pos + 1), position),
        )

        let plusOrMinus = tokens.findIndex(x => x.type === Token.PLUS || x.type === Token.MINUS)
        if(plusOrMinus !== -1) {
            return await makeNode(plusOrMinus)
        }

        let mulOrDiv = tokens.findIndex(x => x.type === Token.MUL || x.type === Token.DIV)
        if(mulOrDiv !== -1)
            return await makeNode(mulOrDiv)
        throw new SyntaxErr(position, tokens[0].toString())
    }

    static getArrayFromTo(array, from, to = array.length) {
        let _array = []
        for(let i = from; i < to; i++) {
            if(array[i] !== undefined) _array.push(array[i])
            else break
        }
        return _array
    }

    static replaceArrayFromTo(array, from, to = array.length - 1, replace) {
        let _array = []
        for (let i = 0; i < from; i++)
            _array.push(array[i])
        _array = _array.concat(replace)
        for (let i = to + 1; i <= array.length - 1; i++)
            _array.push(array[i])
        return _array
    }
}

module.exports = Parser