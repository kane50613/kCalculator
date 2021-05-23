class IllegalCharErr extends Error {
    constructor(position, char, message) {
        super(message ? message : `[IllegalCharErr] Invalid or unexpected token ${char} at ${position?.row || 'unknown'}:${position?.col || 'unknown'}`);
    }
}

module.exports = IllegalCharErr