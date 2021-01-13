const reverse = require('buffer-reverse');

const ServerMessage = require('./Messages/ServerMessage');
const Incoming = require('./Messages/Incoming/Incoming').getInstance();
const Outgoing = require('./Messages/Outgoing/Outgoing').getInstance();

const HelloComposer = require('./Messages/Outgoing/Handshake/HelloComposer');
const InitDhHandshakeComposer = require('./Messages/Outgoing/Handshake/InitDhHandshakeComposer');

const DhInitHandshakeEvent = require('./Messages/Incoming/Handshake/DhInitHandshakeEvent');
const DhCompleteHandshakeEvent = require('./Messages/Incoming/Handshake/DhCompleteHandshakeEvent');

class PacketHandler {
  constructor(network) {
    this.network = network;
    this.handlers = [];
  }

  registerPackets() {
    this.registerPacket(Incoming.DhInitHandshake, DhInitHandshakeEvent);
    this.registerPacket(Incoming.DhCompleteHandshake, DhCompleteHandshakeEvent);
  }

  registerPacket(header, handler) {
    this.handlers[header] = handler;
  }

  onDataReceive(buffer) {
    let countPackets = 0;
    let maxPackets = 50;

    if (this.buffer) {
      buffer = Buffer.concat([this.buffer, buffer]);
      this.buffer = null;
    }

    while (buffer.length > 3) {
      if (countPackets++ >= maxPackets) {
        return packets;
      }

      let length = buffer.readInt32BE(0) + 4;

      if (length > buffer.length) {
        if (this.buffer) {
          this.buffer = Buffer.concat([this.buffer, buffer]);
        } else {
          this.buffer = buffer;
        }
        return;
      }

      let packet = buffer.slice(0, length);

      if (this.network.session.crypto.incomingChaCha) {
         let headerBytes = reverse(packet.slice(4, 6));

        reverse(this.network.session.crypto.incomingChaCha.encrypt(headerBytes)).copy(packet, 4);
      }

      let packetHeader = packet.readInt16BE(4);

      this.handlePacket(new ServerMessage(packet, Incoming.indexed[packetHeader]));

      buffer = buffer.slice(length);
    }
  }

  handlePacket(packet) {
    if (this.handlers[packet.header]) {
      console.log('[INCOMING][' + packet.name + ']', packet.getMessageBody());

      let handler = new this.handlers[packet.header]();
      handler.client = this.network.client;
      handler.session = this.network.session;
      handler.network = this.network;
      handler.packetHandler = this;
      handler.packet = packet;

      handler.handle();
    } else {
      console.log('[UNHANDLED INCOMING][' + packet.name + ']', packet.getMessageBody());
    }
  }

  instantiate() {
    this.registerPackets();

    let hello = new HelloComposer('18C199405558FE3C4534DF9E', 'UNITY1');
    let initDhHandshake = new InitDhHandshakeComposer();

    this.sendMessages([hello, initDhHandshake]);
  }

  sendMessage(message) {
    message.compose();

    let buffer = message.response.get();

    console.log('[OUTGOING]', message.response.getMessageBody());

    if (this.network.session.crypto.outgoingChaCha) {
      let headerBytes = reverse(buffer.slice(4, 6));

      reverse(this.network.session.crypto.outgoingChaCha.encrypt(headerBytes)).copy(buffer, 4);
    }

    this.network.tlsClient.prepare(buffer.toString('binary'));
  }

  sendMessages(messages) {
    let buffer = Buffer.alloc(0);

    messages.forEach(message => {
      message.compose();

      let messageBuffer = message.response.get();

      console.log('[OUTGOING]', message.response.getMessageBody());

      if (this.network.session.crypto.outgoingChaCha) {
        let headerBytes = reverse(messageBuffer.slice(4, 6));

        reverse(this.network.session.crypto.outgoingChaCha.encrypt(headerBytes)).copy(messageBuffer, 4);
      }

      buffer = Buffer.concat([buffer, messageBuffer]);
    });

    this.network.tlsClient.prepare(buffer.toString('binary'));
  }
}

module.exports = PacketHandler;