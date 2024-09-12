const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.json());

let messageQueue = [];

app.post('/api/queue', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  messageQueue.push(message);
  return res.status(201).json({ message: 'Message added to queue' });
});

app.get('/api/queue', (req, res) => {
  if (messageQueue.length === 0) {
    return res.status(404).json({ error: 'Queue is empty' });
  }

  const nextMessage = messageQueue.shift(); 
  return res.status(200).json({ message: nextMessage });
});

app.get('/api/queue/all', (req, res) => {
    if (messageQueue.length === 0) {
      return res.status(404).json({ error: 'Queue is empty' });
    }
  
    return res.status(200).json({ messages: messageQueue });
  });

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
