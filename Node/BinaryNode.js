class BinaryNode {
    constructor(left, operator, right) {
        this.leftNode = left
        this.operator = operator
        this.rightNode = right
    }

    toString() {
        return `(${this.leftNode.toString()}${this.operator}${this.rightNode.toString()})`
    }
}

module.exports = BinaryNode