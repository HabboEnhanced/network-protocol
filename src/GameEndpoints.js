class GameEndpoints {
  static getEndpointByCountry(country) {
    switch(country) {
      case 'com':
      case 'us':
        return 'wss://game-us.habbo.com:30001/websocket';
      case 'br':
        return 'wss://game-br.habbo.com:30001/websocket';
      case 'tr':
        return 'wss://game-tr.habbo.com:30001/websocket';
      case 'de':
        return 'wss://game-de.habbo.com:30001/websocket';
      case 'es':
        return 'wss://game-es.habbo.com:30001/websocket';
      case 'fi':
        return 'wss://game-fi.habbo.com:30001/websocket';
      case 'fr':
        return 'wss://game-fr.habbo.com:30001/websocket';
      case 'it':
        return 'wss://game-it.habbo.com:30001/websocket';
      case 'nl':
        return 'wss://game-nl.habbo.com:30001/websocket';
      case 'sandbox':
        return 'wss://game-s2.habbo.com:30001/websocket';
      default:
        throw new Error('Country not found.');
    }
  }
}

module.exports = GameEndpoints;