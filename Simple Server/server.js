const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000, host: '192.168.1.2' });

server.on('connection', (socket) => {
  // Set an interval to send changing float numbers
  const interval = setInterval(() => {
    // Generate a random float number between 0 and 359.99
    const floatNumber = Math.random() * 360;

    // Send the float number to the connected client
    socket.send(floatNumber.toString());
  }, 1000); // Adjust the interval as needed (here, it sends a new number every second)

  // Handle messages from the client (if needed)
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  // Print a message when a connection is established
  console.log('Client connected');

  // You can also send a welcome message to the client if needed
  // socket.send('Welcome to the server!');

  // Cleanup: Stop sending numbers when the client disconnects
  socket.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

console.log('Server is listening on port 3000');
