const net = require('net');

function checkServer(host, port) {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(3000); // Timeout after 3 seconds

        socket.on('connect', () => {
            resolve(true); // Server is reachable
            socket.destroy();
        });

        socket.on('error', () => {
            resolve(false); // Server is not reachable
        });

        socket.on('timeout', () => {
            resolve(false); // Connection timed out
            socket.destroy();
        });

        socket.connect(port, host);
    });
}

module.exports = { checkServer }