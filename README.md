# SwarmMQ
A small message queue system. The plan is to have the queue stored in a local JSON file (a sort of home made database). Current functionality is a temporary buffer which is cleared when the application is stopped. 

Run SwarmMQ by doing the following:

cd /backend && npm start

cd /frontend && npm start

### Front end.
The front end is a basic UI that will be used for admin
purposees.

### Back end.
The back end consists of headless APIs that can be used post/get
messages from the queue.

POST to the message queue:

curl -X POST http://localhost:3000/queue -H "Content-Type: application/json" -d '{"message": "I am a message"}'

GET the message queue:

curl http://localhost:3000/queue
