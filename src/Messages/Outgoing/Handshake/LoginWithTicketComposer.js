const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class LoginWithTicketComposer extends MessageComposer {
  constructor(ssoTicket) {
    super();
    this.ssoTicket = ssoTicket;
  }

  compose() {
    this.response.init(Outgoing.LoginWithTicket);
    this.response.appendString(this.ssoTicket);
    this.response.appendInt(0);
  }
}

module.exports = LoginWithTicketComposer;