const WebSocket = require('ws');
let wss; 

function initializeWebSocketServer(server) {
  wss = new WebSocket.Server({ server });

  // Postavljanje WebSocket konekcije
  wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
}

function broadcastOrderUpdate(order) {
  if (wss) {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'ORDER_UPDATED', payload: order }));
      }
    });
  } else {
    console.error('WebSocket server not initialized.');
  }
}

module.exports = { initializeWebSocketServer, broadcastOrderUpdate };
