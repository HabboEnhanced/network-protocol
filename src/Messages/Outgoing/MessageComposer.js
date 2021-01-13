const ClientMessage = require('../ClientMessage');

class MessageComposer {
  constructor() {
    if (this.constructor == MessageComposer) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.response = new ClientMessage();
  }

  compose() {
    throw new Error("Method 'compose()' must be implemented.");
  }
}

module.exports = MessageComposer;