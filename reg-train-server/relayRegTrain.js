const osc = require('osc');

// Create an OSC UDP Port for listening to incoming OSC messages
const udpPort = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 6448 // The port the peak frequency program sends data to
});

// Listen for incoming OSC messages
udpPort.on("message", (oscMsg) => {
    console.log("Received OSC message:", oscMsg);

    // Forward the message to Wekinator on port 6447
    udpPort.send({
        address: oscMsg.address,
        args: oscMsg.args
    }, "127.0.0.1", 6447);
});





// Open the UDP Port
udpPort.open();
