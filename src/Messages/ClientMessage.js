class ClientMessage {
  init(header) {
    this.header = header;
    this.buffer = Buffer.alloc(2);
    this.buffer.writeInt16BE(header, 0);
  }

  appendRawBytes(buffer) {
    this.buffer = Buffer.concat([this.buffer, buffer]);
  }

  appendString(str) {
    let stringBuffer = Buffer.from(str, 'binary');
    let lengthBuffer = Buffer.alloc(2);
    lengthBuffer.writeInt16BE(stringBuffer.length, 0);

    this.buffer = Buffer.concat([this.buffer, lengthBuffer, stringBuffer]);
  }

  appendChar(char) {
    let buffer = Buffer.alloc(1);
    buffer[0] = char;

    this.buffer = Buffer.concat([this.buffer, buffer]);
  }

  appendInt(value) {
    let buffer = Buffer.alloc(4);
    buffer.writeInt32BE(value, 0);

    this.buffer = Buffer.concat([this.buffer, buffer]);
  }

  appendLong(value) {
    if (typeof value !== 'bigint') {
      //value = BigInt(value);
    }

    let buffer = Buffer.alloc(8);
    //buffer.writeBigInt64BE(value, 0);
    buffer.writeInt32BE(0, 0);
    buffer.writeInt32BE(value, 4);

    this.buffer = Buffer.concat([this.buffer, buffer]);
  }

  appendShort(value) {
    let buffer = Buffer.alloc(2);
    buffer.writeInt16BE(value, 0);

    this.buffer = Buffer.concat([this.buffer, buffer]);
  }

  appendBoolean(value) {
    let buffer = Buffer.alloc(1);
    buffer[0] = value;

    this.buffer = Buffer.concat([this.buffer, buffer]);
  }

  getMessageBody() {
    let result = "";

    for (let i = 0; i < this.buffer.length; i++) {
      if (this.buffer[i] <= 13) {
        result += "[" + this.buffer[i] + "]";
      } else {
        result += String.fromCharCode(this.buffer[i]);
      }
    }

    return result;
  }

  getHeader() {
    return this.header;
  }

  get() {
    let buffer = Buffer.alloc(4);
    buffer.writeInt32BE(this.buffer.length, 0);

    return Buffer.concat([buffer, this.buffer]);
  }
}

module.exports = ClientMessage;