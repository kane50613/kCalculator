const Token = require("./Token");
const BinaryNode = require("./Node/BinaryNode");
const NumberNode = require("./Node/NumberNode");
const SyntaxErr = require("./Error/SyntaxErr");

class Parser {
    static parse = async (tokens, position) => {
        let lParen, rParen

        do {
            lParen = rParen = undefined
            for(let i = 0; i < tokens.length; i++) {
                if(tokens[i]?.type === Token.LPAREN)
                    lParen = i
                if(tokens[i]?.type === Token.RPAREN) {
                    rParen = i
                    break
                }
            }

            if(lParen === undefined && rParen !== undefined)
                throw new SyntaxErr(position, null, 'missing `)`')
            if(lParen !== undefined && rParen === undefined)
                throw new SyntaxErr(position, null, 'missing `(`')

            if(lParen !== undefined && rParen !== undefined) {
                tokens = Parser.replaceArrayFromTo(
                    tokens,
                    lParen,
                    rParen,
                    await this.parse(Parser.getArrayFromTo(tokens, lParen + 1, rParen), position)
                )
            }
        } while(lParen !== undefined || rParen !== undefined)

        if(tokens.length === 1) {
            if(tokens[0] instanceof NumberNode || tokens[0] instanceof BinaryNode)
                return tokens[0]
            if(tokens[0]?.type === Token.INT || tokens[0]?.type === Token.FLOAT)
                return new NumberNode(tokens[0]?.value)
            throw new SyntaxErr(position, tokens[0].toString())
        }

        if(tokens.length < 3)
            throw new SyntaxErr(position)

        const makeNode = async pos => new BinaryNode(
            tokens[pos - 1] instanceof BinaryNode || tokens[pos - 1] instanceof NumberNode ?
                await this.parse([...this.getArrayFromTo(tokens, 0, pos - 1), tokens[pos - 1]], position) :
                await this.parse(this.getArrayFromTo(tokens, 0, pos), position),
            tokens[pos],
            tokens[pos + 1] instanceof BinaryNode || tokens[pos + 1] instanceof NumberNode ?
                await this.parse([tokens[pos + 1], ...this.getArrayFromTo(tokens, pos + 2)], position) :
                await this.parse(this.getArrayFromTo(tokens, pos + 1), position),
        )

        let plusOrMinus = tokens.findIndex(x => x.type === Token.PLUS || x.type === Token.MINUS)
        if(plusOrMinus !== -1)
            return await makeNode(plusOrMinus)

        let mulOrDiv = tokens.findIndex(x => x.type === Token.MUL || x.type === Token.DIV)
        if(mulOrDiv !== -1)
            return await makeNode(mulOrDiv)

        let pow = tokens.findIndex(x => x.type === Token.POWER)
        if(pow !== -1)
            return await makeNode(pow)

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