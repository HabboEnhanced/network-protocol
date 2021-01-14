const MessageHandler = require('../MessageHandler');

const GetRoomEntryDataComposer = require('../../Outgoing/Room/GetRoomEntryDataComposer');
const GetRoomOccupiedTilesComposer = require('../../Outgoing/Room/GetRoomOccupiedTilesComposer');

class RoomReadyEvent extends MessageHandler {
  handle() {
    let getRoomEntryData = new GetRoomEntryDataComposer();
    let getRoomOccupiedTiles = new GetRoomOccupiedTilesComposer();
    this.packetHandler.sendMessages([getRoomEntryData, getRoomOccupiedTiles]);
  }
}

module.exports = RoomReadyEvent;