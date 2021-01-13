class Session {
  constructor() {
    this.crypto = {
      rsa: null,
      dh: {},
      iv: null,
      incomingChaCha: null,
      outgoingChaCha: null
    }
  }
}

module.exports = Session;