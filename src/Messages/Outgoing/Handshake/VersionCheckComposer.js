const MessageComposer = require('../MessageComposer');
const Outgoing = require('../Outgoing').getInstance();

class VersionCheckComposer extends MessageComposer {
  constructor(version) {
    super();
    this.version = version;
  }

  compose() {
    this.response.init(Outgoing.VersionCheck);
    this.response.appendInt(0);
    this.response.appendString(this.version);
    this.response.appendShort(0);
  }
}

module.exports = VersionCheckComposer;