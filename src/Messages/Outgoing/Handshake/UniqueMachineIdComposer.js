const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class UniqueMachineIdComposer extends MessageComposer {
  constructor(machineId, browserVersion) {
    super();
    this.machineId = machineId;
    this.browserVersion = browserVersion;
  }

  compose() {
    this.response.init(Outgoing.UniqueMachineId);
    this.response.appendString(this.machineId);
    this.response.appendString('n/a');
    this.response.appendString(this.browserVersion);
    this.response.appendString('n/a');
  }
}

module.exports = UniqueMachineIdComposer;