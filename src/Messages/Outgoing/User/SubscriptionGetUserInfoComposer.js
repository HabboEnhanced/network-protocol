const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class SubscriptionGetUserInfoComposer extends MessageComposer {
  constructor(subscriptionType) {
    super();
    this.subscriptionType = subscriptionType;
  }

  compose() {
    this.response.init(Outgoing.SubscriptionGetUserInfo);
    this.response.appendString(this.subscriptionType);
  }
}

module.exports = SubscriptionGetUserInfoComposer;