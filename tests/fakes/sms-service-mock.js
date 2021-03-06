"use strict";

class SmsServiceMock {
    constructor() {
        this._lastSentMessage = '';
    }

    send(message) {
        console.log("SmsServiceMock.send: " + message);
        this._lastSentMessage = message;
    }

    get lastSendMessage() {
        return this._lastSentMessage;
    }
}

module.exports = SmsServiceMock;
