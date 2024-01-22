const wss = require('../../index').wss;
function handleMessage(message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

module.exports = {
  handleMessage
};
