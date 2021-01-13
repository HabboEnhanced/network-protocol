const forge = require('node-forge');
const axios = require('axios');

const Incoming = require('./Messages/Incoming/Incoming').getInstance();
const Outgoing = require('./Messages/Outgoing/Outgoing').getInstance();
const ClientCertificate = require('./ClientCertificate');
const PacketHandler = require('./PacketHandler');
const Util = require('./Util');

class Network {
  constructor(client, websocketEndpoint, ssoTicket) {
    this.client = client;
    this.websocketEndpoint = websocketEndpoint;
    this.ssoTicket = ssoTicket;

    this.packetHandler = new PacketHandler(this);
  }

  async connect() {
    await this.loadHeaders();

    this.tlsClient = forge.tls.createConnection({
      server: false,
      caStore: [ ClientCertificate.getCertificateAuthority() ],
      sessionCache: null,
      cipherSuites: [
        forge.tls.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA
      ],
      verify: (c, verified, depth, certs) => {
        let firstCertOrganization = certs[0].subject.getField('O').value;
        let firstCertCommonName = certs[0].subject.getField('CN').value;
        let secondCertOrganization = certs[1].subject.getField('O').value;
        let secondCertCommonName = certs[1].subject.getField('CN').value;

        return firstCertOrganization == 'Sulake Oy' && firstCertCommonName == 'game-*.habbo.com' && secondCertOrganization == 'Sulake Corporation Oy' && secondCertCommonName == 'Sulake Certificate Autority G2';
      },
      getCertificate: (c, hint) => {
        return ClientCertificate.getClientCertificate();
      },
      getPrivateKey: (c, cert) => {
        return ClientCertificate.getClientCertificateKey();
      },
      connected: c => {
        this.onTlsConnected();
      },
      tlsDataReady: c => {
        var bytes = c.tlsData.getBytes();
        this.ws.send(Util.stringToBuffer(bytes));

        console.log('[TLS] Sent', bytes.length, 'bytes');
      },
      dataReady: c => {
        var response = c.data.getBytes();
        this.packetHandler.onDataReceive(Buffer.from(response, 'binary'));
      },
      closed: c => {
        this.onTlsDisconnected();
      },
      error: (c, error) => {
        this.onTlsError(error);
      }
    });

    this.ws = new WebSocket(this.websocketEndpoint);
    this.ws.binaryType = 'arraybuffer';

    this.ws.onopen = () => {
      this.ws.send(Util.stringToBuffer('StartTLS'));
    };

    this.ws.onmessage = event => {
      this.onTlsDataReceived(new Uint8Array(event.data));
    };
  }

  onTlsDataReceived(buffer) {
    if (buffer.length == 0)
      return;

    console.log('[TLS] Received', buffer.length, 'bytes');

    if (buffer.length == 2 && buffer[0] == '79' && buffer[1] == '75') {
      this.tlsClient.handshake();
    } else {
      this.tlsClient.process(String.fromCharCode.apply(null, buffer));
    }
  }

  onTlsConnected() {
    console.log('Client connected.');
    this.packetHandler.instantiate();
  }

  onTlsDisconnected() {
    console.log('Client disconnected.');
  }

  onTlsError(error) {
    console.error('Client error: ' + error.message);
  }

  async loadHeaders() {
    let headers = (await axios.get('https://jxz.be/habbo-webgl-clients/headers.json')).data;

    headers.incoming.forEach(header => {
      Incoming.indexed[header.header] = header.name;
      Incoming[header.name] = header.header;
    });

    headers.outgoing.forEach(header => {
      Outgoing.indexed[header.header] = header.name;
      Outgoing[header.name] = header.header;
    });
  }

  sendMessage(message) {
    message.compose();
    this.tlsClient.prepare(message.response.get().toString('binary'));
  }

  sendMessages(messages) {
    let buffer = Buffer.alloc(0);

    messages.forEach(message => {
      message.compose();
      buffer = Buffer.concat([buffer, message.response.get()]);
    });

    console.log(buffer);

    this.tlsClient.prepare(buffer.toString('binary'));
  }
}

module.exports = Network;