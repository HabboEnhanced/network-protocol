const MessageHandler = require('../MessageHandler');
const BigInteger = require('../../../Util/BigInteger');

const CompleteDhHandshakeComposer = require('../../Outgoing/Handshake/CompleteDhHandshakeComposer');

class DhInitHandshakeEvent extends MessageHandler {
  handle() {
    this.session.crypto.dh.prime = new BigInteger(this.session.crypto.rsa.verify(this.packet.readString()), 10);
    this.session.crypto.dh.generator = new BigInteger(this.session.crypto.rsa.verify(this.packet.readString()), 10);

    this.session.crypto.dh.privateKey = new BigInteger('1835282320', 10);
    this.session.crypto.dh.clientPublicKey = this.session.crypto.dh.generator.modPow(this.session.crypto.dh.privateKey, this.session.crypto.dh.prime);

    let completeDhHandshake = new CompleteDhHandshakeComposer(this.session.crypto.rsa.encrypt(this.session.crypto.dh.clientPublicKey.toString()));
    this.packetHandler.sendMessage(completeDhHandshake);
  }
}

module.exports = DhInitHandshakeEvent;