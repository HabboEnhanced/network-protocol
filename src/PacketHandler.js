const ServerMessage = require('./Messages/ServerMessage');
const Incoming = require('./Messages/Incoming/Incoming').getInstance();
const Outgoing = require('./Messages/Outgoing/Outgoing').getInstance();

const HelloComposer = require('./Messages/Outgoing/Handshake/HelloComposer');
const InitDhHandshakeComposer = require('./Messages/Outgoing/Handshake/InitDhHandshakeComposer');

class PacketHandler {
  constructor(network) {
    this.network = network;
  }

  onDataReceive(buffer) {
    let countPackets = 0;
    let maxPackets = 50;

    if (this.buffer) {
      buffer = Buffer.concat([this.buffer, buffer]);
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
        return packets;
      }

      let packet = buffer.slice(0, length);
      let packetHeader = packet.readInt16BE(4);

      this.handlePacket(new ServerMessage(packet, Incoming.indexed[packetHeader]));

      buffer = buffer.slice(length);
    }
  }

  handlePacket(packet) {
    console.log('[INCOMING][' + packet.name + ']', packet.getMessageBody());
  }

  instantiate() {
    let hello = new HelloComposer('18C199405558FE3C4534DF9E', 'UNITY1');
    let initDhHandshake = new InitDhHandshakeComposer();

    this.network.sendMessages([hello, initDhHandshake]);
  }
}

module.exports = PacketHandler;