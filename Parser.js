const Token = require("./Token");
const BinaryNode = require("./Node/BinaryNode");
const NumberNode = require("./Node/NumberNode");

class Parser {
    static parse = async (tokens, position) => {

        if(tokens.length === 1) {
            if(tokens[0]?.type === Token.INT || tokens[0]?.type === Token.FLOAT)
                return new NumberNode(tokens[0].value)
            else return //TODO throw SyntaxErr
        }

        if(tokens.length < 3)
            return //TODO throw SyntaxErr

        let plusOrMinus = tokens.findIndex(x => x.type === Token.PLUS || x.type === Token.MINUS)
        if(plusOrMinus !== -1) {
            return new BinaryNode(
                await this.parse(this.getArrayFromTo(tokens, 0, plusOrMinus)),
                tokens[plusOrMinus],
                await this.parse(this.getArrayFromTo(tokens, plusOrMinus + 1))
            )
        }

        let mulOrDiv = tokens.findIndex(x => x.type === Token.MUL || x.type === Token.DIV)
        if(mulOrDiv !== -1)
            return new BinaryNode(
                await this.parse(this.getArrayFromTo(tokens, 0, mulOrDiv)),
                tokens[mulOrDiv],
                await this.parse(this.getArrayFromTo(tokens, mulOrDiv + 1))
            )

        //TODO parse paren

        //TODO throw SyntaxErr
    }

    static getArrayFromTo(array, from, to = array.length) {
        let _array = []
        for(let i = from; i < to; i++) {
            if(array[i] !== undefined) _array.push(array[i])
            else break
        }
        return _array
    }
}

module.exports = Parser