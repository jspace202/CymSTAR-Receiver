const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000, host: '192.168.1.2' });

server.on('connection', (socket) => {
  // Initialize the current float number and the step size
  let currentFloatNumber = 0;
  let stepSize = 0.01;

  // Set an interval to choose a random float number and update the current number
  const interval = setInterval(() => {
    // Generate a random float number between 0 and 359.99
    const targetFloatNumber = (Math.random() * 360).toFixed(2);

    // Calculate the direction to increase or decrease
    const direction = targetFloatNumber > currentFloatNumber ? 1 : -1;

    // Update the current float number by the step size in the calculated direction
    currentFloatNumber = parseFloat((currentFloatNumber + direction * stepSize).toFixed(2));

    // Send the float number to the connected client
    socket.send(currentFloatNumber.toString());
  }, 1000); // Adjust the interval as needed (here, it chooses a new number every second)

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
