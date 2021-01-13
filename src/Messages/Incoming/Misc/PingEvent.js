const MessageHandler = require('../MessageHandler');

const PongComposer = require('../../Outgoing/Misc/PongComposer');

class PingEvent extends MessageHandler {
  handle() {
    let pong = new PongComposer();
    this.packetHandler.sendMessage(pong);
  }
}

module.exports = PingEvent;