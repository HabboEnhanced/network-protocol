class MessageHandler {
  constructor() {
    if (this.constructor == MessageHandler) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  handle() {
    throw new Error("Method 'handle()' must be implemented.");
  }
}

module.exports = MessageHandler;