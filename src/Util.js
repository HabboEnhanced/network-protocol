class Util {
  static stringToBuffer(string) {
    var buf = new ArrayBuffer(string.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = string.length; i < strLen; i++) {
      bufView[i] = string.charCodeAt(i);
    }

    return buf;
  }
}

module.exports = Util;