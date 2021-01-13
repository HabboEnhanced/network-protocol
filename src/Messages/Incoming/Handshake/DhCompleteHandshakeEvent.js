const MessageHandler = require('../MessageHandler');
const BigInteger = require('../../../Util/BigInteger');
const ChaCha20 = require('../../../Crypto/ChaCha20');

const GetIdentityAgreementTypesComposer = require('../../Outgoing/Handshake/GetIdentityAgreementTypesComposer');

class DhCompleteHandshakeEvent extends MessageHandler {
  handle() {
    this.session.crypto.dh.serverPublicKey = new BigInteger(this.session.crypto.rsa.verify(this.packet.readString()), 10);
    this.session.crypto.dh.sharedKey = this.session.crypto.dh.serverPublicKey.modPow(this.session.crypto.dh.privateKey, this.session.crypto.dh.prime);

    var chachaKey = Buffer.alloc(32);
    chachaKey.fill(0);
    Buffer.from(this.session.crypto.dh.sharedKey.toByteArray(true)).copy(chachaKey);

    this.session.crypto.iv = Buffer.from('18194055FEC434F9', 'hex');

    this.session.crypto.incomingChaCha = new ChaCha20(chachaKey, this.session.crypto.iv);
    this.session.crypto.outgoingChaCha = new ChaCha20(chachaKey, this.session.crypto.iv);
    console.log('CRYPTO DONE');

    let getIdentityAgreementTypes = new GetIdentityAgreementTypesComposer();
    this.packetHandler.sendMessage(getIdentityAgreementTypes);
  }
}

module.exports = DhCompleteHandshakeEvent;