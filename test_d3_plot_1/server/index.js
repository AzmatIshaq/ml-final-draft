const WebSocket = require("ws");
const osc = require("osc");

const wss = new WebSocket.Server({ port: 6441 });

// Set up an OSC over UDP server
const udpPort = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 6448 // This is a common port used by OSC, but you can change it
});

udpPort.on("ready", () => {
    console.log("OSC Server is listening.");
});

udpPort.on("message", (oscMsg) => {
    console.log("Received OSC message:", oscMsg); // Log the received OSC message

    // Forward OSC message to all WebSocket clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(oscMsg));
        }
    });
});

udpPort.open();

wss.on("connection", (ws) => {
    console.log("New client connected to server!");

    ws.on("close", () => {
        console.log("Client has disconnected!");
    });
});
