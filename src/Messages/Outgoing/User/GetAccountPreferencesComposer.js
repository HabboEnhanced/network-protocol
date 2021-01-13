const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class GetAccountPreferencesComposer extends MessageComposer {
  constructor() {
    super();
  }

  compose() {
    this.response.init(Outgoing.GetAccountPreferences);
  }
}

module.exports = GetAccountPreferencesComposer;