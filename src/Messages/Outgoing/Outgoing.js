class Outgoing {
  static instance;

  static getInstance() {
    if (!Outgoing.instance) {
      Outgoing.instance = new Outgoing();
    }

    return Outgoing.instance;
  }

  constructor() {
    this.indexed = [];
  }
}

module.exports = Outgoing;