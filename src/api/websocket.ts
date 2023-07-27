import WebSocket from 'websocket'
import { webSocketServer } from './server'

const client = new WebSocket.client();

client.on('connectFailed', (error) => {
    console.log(`${error.toString()}`);
});

client.on('connect', (connection) => {
    console.log('WebSocket client connected');

    connection.on('error', (error) => {
    })

    connection.on('close', () => {
    })

    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            console.log(`${message.utf8Data}`);
        }
    })
})

client.connect(webSocketServer);
