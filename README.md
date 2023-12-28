# P2P File Sharing Web Application

This is a simple peer-to-peer (P2P) file sharing web application built using Node.js, Express.js, and Socket.IO. It allows users to securely share files between a sender and a receiver.

## Features

- Secure peer-to-peer file sharing.
- Randomly generated room IDs for each file sharing session.
- Real-time updates on file transfer progress.

## Prerequisites

Before running the application, make sure you have the following installed on your system:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm (Node Package Manager): Comes with Node.js installation.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/p2p-file-sharing.git

## Installation

Navigate to your directory
e.g cd p2p-file-sharing


## Install required dependency
npm i or npm install

## Start the server
npm start 

NOTE: server runs on port 4000 if your port is busy feel free to change to any port

## Once server starts

The server will start and listen on http://localhost:4000.
Open your web browser and access the sender interface:

http://localhost:4000

Ask reciever to open web browser and access the reciever interface:
http://localhost:4000/receiver.html

## Sender screen
Click on "Create Room" to generate a room ID.
Share the room ID with the receiver.
The sender can then select files to share, and the receiver can download them.

## Reciever screen
The receiver should access the receiver interface and enter the room ID to connect.()




