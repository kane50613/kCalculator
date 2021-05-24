const Token = require("../Token");

class BinaryNode {
    constructor(left, operator, right) {
        this.leftNode = left
        this.operator = operator
        this.rightNode = right
    }

    toString() {
        return `(${this.leftNode.toString()}${this.operator}${this.rightNode.toString()})`
    }

    calculate() {
        if(this.operator.type === Token.PLUS)
            return this.leftNode.calculate() + this.rightNode.calculate()
        if(this.operator.type === Token.MINUS)
            return this.leftNode.calculate() - this.rightNode.calculate()
        if(this.operator.type === Token.MUL)
            return this.leftNode.calculate() * this.rightNode.calculate()
        if(this.operator.type === Token.DIV)
            return this.leftNode.calculate() / this.rightNode.calculate()
    }
}

module.exports = BinaryNode