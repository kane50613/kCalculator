class SyntaxErr extends Error {
    constructor(position, char, message) {
        super(message ? message : `Invalid or unexpected token ${char} at ${position?.row || 'unknown'}:${position?.col || 'unknown'}`);
    }
}

module.exports = SyntaxErr