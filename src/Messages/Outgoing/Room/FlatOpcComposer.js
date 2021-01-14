const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class FlatOpcComposer extends MessageComposer {
  constructor(roomId, password) {
    super();
    this.roomId = roomId;
    this.password = password;
  }

  compose() {
    this.response.init(Outgoing.FlatOpc);
    this.response.appendLong(this.roomId);
    this.response.appendString(this.password);
    this.response.appendLong(-1);
  }
}

module.exports = FlatOpcComposer;