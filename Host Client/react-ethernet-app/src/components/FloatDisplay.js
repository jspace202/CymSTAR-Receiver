import React, { useState, useEffect } from 'react';
import './FloatDisplay.css'; // Import the CSS file

const FloatDisplay = () => {
  const [floatNumber, setFloatNumber] = useState(0);
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.1.2:3000');

    socket.addEventListener('open', () => {
      console.log('Connected to server');
    });

    socket.addEventListener('message', (event) => {
      const receivedFloat = parseFloat(event.data);
      setFloatNumber(receivedFloat);
    });

    return () => {
      socket.close();
    };
  }, [isStreaming]);

  const toggleStreaming = () => {
    setIsStreaming((prev) => !prev);
  };

  return (
    <div className="float-display-container">
      <h1>Synchro Transmitter Angle:</h1>
      <h2> {floatNumber}&deg;</h2>
      <button onClick={toggleStreaming}>
        {isStreaming ? 'Stop Streaming' : 'Start Streaming'}
      </button>
    </div>
  );
};

export default FloatDisplay;

