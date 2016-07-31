require('paint-console')
var Serial = require('serialport')
const BAUDRATE = 115200
const RECONNECT_INTERVAL = 5

class Sensor {
    constructor(port) {
        this.buffer = ''
        this.port = port
        this.connect()
    }
    // Closed connection callback
    closed() {
        console.warn("Connection closed. Reconnecting in " + RECONNECT_INTERVAL + " seconds....")
        setTimeout(this.connect.bind(this), RECONNECT_INTERVAL * 1000)
    }
    // Connect to sensor and bind callbacks
    connect() {
        this.connection = new Serial(this.port, { baudRate: BAUDRATE})
        this.connection.on('close', this.closed.bind(this))
        this.connection.on('error', this.error.bind(this))
        this.connection.on('open', () => { console.info('Opening port...'); this.buffer = ''})
        this.connection.on('data', this.receive.bind(this))
    }
    // Deal with errors
    error(err) {
        console.error(err.message)
        console.warn("Attempting reconnect in " + RECONNECT_INTERVAL + " seconds...")
        setTimeout(this.connect.bind(this), RECONNECT_INTERVAL * 1000)
    }
    // Process an incoming message
    processMessage(msg) {
        if (msg == 'Connected') {
            console.info('Connected to sensor!')
            return
        }
        console.info('Temp: ' + parseFloat(msg))
    }
    // Receive message on serial
    receive(msg) {
        this.buffer += msg
        if (this.buffer.indexOf('\r\n') === -1) {
            return
        }
        var messages = this.buffer.split('\r\n')
        for (let message of messages.slice(0, -1)) {
            // Remove null bytes and whitespace
            this.processMessage(message.replace(/\0/g, '').trim())
        }
        this.buffer = messages[messages.length -1]
    }
}

// Main process
if (process.argv.length < 3) {
    console.error("Usage: node app.js <serial_port> (E.G. /dev/ttyUSB0)")
    process.exit()
}
var sensor = new Sensor(process.argv[2])
