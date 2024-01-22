const { WebSocketServer, WebSocket } = require('ws');
const wss = new WebSocketServer({ port: 3000 });


wss.on('connection', ws => {
    console.log("cliente conectado");

    ws.on('close', () => {
        console.log("cliente desconectado");
    });
  ws.on('message',data => {
    try {
      const message = JSON.parse(data);
      const username = message.username;
      const content = message.content;
      wss.clients.forEach( client =>{
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(`${username}: ${content}`);
        }
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });
});
