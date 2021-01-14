const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class GetRoomEntryDataComposer extends MessageComposer {
  constructor() {
    super();
  }

  compose() {
    this.response.init(Outgoing.GetRoomEntryData);
  }
}

module.exports = GetRoomEntryDataComposer;