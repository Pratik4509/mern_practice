#!/bin/bash

# Navigate to the server directory of your project (change if needed)
cd ./server/

# Start MongoDB service (modify if using a different database)

# Start the Node.js server in development mode (modify if needed)
node index.js

# Navigate to the client directory of your project (change if needed)
cd ./client/

# Start a separate process for the React app (modify if needed)
npm start

# Display message
echo "MERN app is running!"
