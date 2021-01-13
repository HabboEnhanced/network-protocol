const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class MarketplaceCanMakeOfferComposer extends MessageComposer {
  constructor() {
    super();
  }

  compose() {
    this.response.init(Outgoing.MarketplaceCanMakeOffer);
  }
}

module.exports = MarketplaceCanMakeOfferComposer;