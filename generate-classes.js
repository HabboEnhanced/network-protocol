const axios = require('axios');
const fs = require('fs');

const template = fs.readFileSync('./src/Messages/Outgoing/User/GetGdprRequestComposer.js', 'UTF-8');
const template2 = fs.readFileSync('./src/Messages/Incoming/Misc/PingEvent.js', 'UTF-8');

(async() => {
  let headers = (await axios.get('https://jxz.be/habbo-webgl-clients/headers.json')).data;

  headers.outgoing.forEach(message => {
    let newTemplate = template.replaceAll('GetGdprRequest', message.name);

    fs.writeFileSync('.cache/outgoing/' + message.name + 'Composer.js', newTemplate);
  });

  headers.incoming.forEach(message => {
    let newTemplate = template2.replaceAll('Ping', message.name);

    fs.writeFileSync('.cache/incoming/' + message.name + 'Event.js', newTemplate);
  });
})();