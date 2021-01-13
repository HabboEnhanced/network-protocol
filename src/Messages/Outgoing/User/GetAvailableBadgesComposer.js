const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class GetAvailableBadgesComposer extends MessageComposer {
  constructor() {
    super();
  }

  compose() {
    this.response.init(Outgoing.GetAvailableBadges);
  }
}

module.exports = GetAvailableBadgesComposer;