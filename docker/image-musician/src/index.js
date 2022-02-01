
const protocol = require('./protocol')

if (process.argv.length != 3) {
    console.log('Invalid number of arguments ! Quitting...')
    process.exit()
}

if (!(process.argv[2] in protocol.instruments)) {
    console.log('Invalid instrument ! Quitting...')
    process.exit()
}

const sound = protocol.instruments[process.argv[2]]
const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

console.log('Now playing sound: ' + sound)


