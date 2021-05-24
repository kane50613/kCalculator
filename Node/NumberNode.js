class NumberNode {
    constructor(number) {
        this.number = number
    }

    toString() {
        return `${this.number}`
    }

    calculate() {
        return Number(this.number)
    }
}

module.exports = NumberNode