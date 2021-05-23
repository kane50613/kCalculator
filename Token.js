class Token {
    static DIGITS = '0123456789'
    static INT = 'INT'
    static FLOAT = 'FLOAT'
    static PLUS = 'PLUS'
    static MINUS = 'MINUS'
    static MUL = 'MUL'
    static DIV = 'DIV'
    static LPAREN = 'LPAREN'
    static RPAREN = 'RPAREN'
    static UNKNOWN = '?'

    constructor(type = this.UNKNOWN, value) {
        this.type = type
        if(value)
            this.value = value
    }

    toString() {
        return `${this.type}${this.value ? ':' + this.value : ''}`
    }
}

module.exports = Token