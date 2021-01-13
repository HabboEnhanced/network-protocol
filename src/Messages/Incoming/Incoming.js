class Incoming {
  static instance;

  static getInstance() {
    if (!Incoming.instance) {
      Incoming.instance = new Incoming();
    }

    return Incoming.instance;
  }

  constructor() {
    this.indexed = [];
  }
}

module.exports = Incoming;