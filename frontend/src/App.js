import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [queueMessage, setQueueMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const postMessage = async (e) => {
    e.preventDefault();
    if (!message) return;

    try {
      const response = await fetch('/api/queue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      alert(data.message);
      setMessage(''); 
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  const getMessage = async () => {
    try {
      const response = await fetch('/api/queue');
      const data = await response.json();
      if (response.ok) {
        setQueueMessage(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  const getAllMessages = async () => {
    try {
      const response = await fetch('/api/queue/all');
      const data = await response.json();
      setAllMessages(data.messages); 
    } catch (error) {
      console.error('Error fetching all messages:', error);
    }
  };

  return (
    <div className="App">
      <h1 className="title">SwarmMQ</h1>

      <form className="message-form" onSubmit={postMessage}>
        <label className="input-label">
          Message to submit: 
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="message-input"
          />
        </label>
        <button type="submit" className="btn btn-submit">
          Add Message to Queue
        </button>
      </form>

      <div className="buttons-container">
        {/* Reorder the buttons here */}
        <button onClick={getAllMessages} className="btn btn-action">
          Get All Messages in Queue
        </button>

        <button onClick={getMessage} className="btn btn-action">
          Get Next Message from Queue
        </button>
      </div>

      {queueMessage && (
        <div className="queue-message">
          <h2>Next Message in Queue:</h2>
          <p>{queueMessage}</p>
        </div>
      )}

      {allMessages.length > 0 && (
        <div className="all-messages">
          <h2>All Messages in Queue:</h2>
          <ul>
            {allMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
