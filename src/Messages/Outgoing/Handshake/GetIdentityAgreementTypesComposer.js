const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class GetIdentityAgreementTypesComposer extends MessageComposer {
  constructor() {
    super();
  }

  compose() {
    this.response.init(Outgoing.GetIdentityAgreementTypes);
  }
}

module.exports = GetIdentityAgreementTypesComposer;