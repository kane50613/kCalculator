class IllegalCharErr extends Error {
    constructor(position, char, message) {
        super(message ? message : `Invalid or unexpected token ${char} at ${position?.row || 'unknown'}:${position?.col || 'unknown'}`);
        this.name = 'IllegalCharErr'
    }
}

module.exports = IllegalCharErr