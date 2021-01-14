const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class GetGuestRoomComposer extends MessageComposer {
  constructor(roomId) {
    super();
    this.roomId = roomId;
  }

  compose() {
    this.response.init(Outgoing.GetGuestRoom);
    this.response.appendLong(this.roomId);
    this.response.appendInt(1);
    this.response.appendInt(0);
  }
}

module.exports = GetGuestRoomComposer;