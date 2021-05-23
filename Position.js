class Position {
    constructor() {
        this.col = 1
        this.row = 1
        this.index = 0
    }

    nextLine() {
        this.col = 1
        this.row++
        this.index++
    }

    nextChar(length = 1) {
        this.col += length
        this.index += length
    }
}

module.exports = Position