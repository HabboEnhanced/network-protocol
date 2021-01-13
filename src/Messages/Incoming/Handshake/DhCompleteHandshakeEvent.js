const MessageHandler = require('../MessageHandler');
const BigInteger = require('../../../Util/BigInteger');
const Util = require('../../../Util/Util');
const ChaCha20 = require('../../../Crypto/ChaCha20');

const GetIdentityAgreementTypesComposer = require('../../Outgoing/Handshake/GetIdentityAgreementTypesComposer');
const VersionCheckComposer = require('../../Outgoing/Handshake/VersionCheckComposer');
const UniqueMachineIdComposer = require('../../Outgoing/Handshake/UniqueMachineIdComposer');
const LoginWithTicketComposer = require('../../Outgoing/Handshake/LoginWithTicketComposer');

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
    let versionCheck = new VersionCheckComposer('0.12.2');
    let uniqueMachineId = new UniqueMachineIdComposer(Util.randomHexString(76), 'Chrome 84');
    let loginWithTicket = new LoginWithTicketComposer(this.session.ssoTicket);

    this.packetHandler.sendMessages([getIdentityAgreementTypes, versionCheck, uniqueMachineId, loginWithTicket]);
  }
}

module.exports = DhCompleteHandshakeEvent;