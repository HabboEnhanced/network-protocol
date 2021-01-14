const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class GetRoomOccupiedTilesComposer extends MessageComposer {
  constructor() {
    super();
  }

  compose() {
    this.response.init(Outgoing.GetRoomOccupiedTiles);
  }
}

module.exports = GetRoomOccupiedTilesComposer;