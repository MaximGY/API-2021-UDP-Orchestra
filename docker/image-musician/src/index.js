
const protocol = require('./protocol')

if (process.argv.length != 3) {
    console.log('Invalid number of arguments ! Quitting...')
    process.exit()
}
else if (!(process.argv[2] in protocol.instruments)) {
    console.log('Invalid instrument ! Quitting...')
    process.exit()
}

const uuid = require('chance').Chance().guid() // Ol' reliable chance.js
const sound = protocol.instruments[process.argv[2]]
const socket = require('dgram').createSocket('udp4')
const timeout = 1000 // ms

console.log('Started playing ! I am ' + uuid)

setInterval(
    function() {
        const payload = JSON.stringify({
            uuid: uuid, 
            sound: sound
        })

        console.log(sound)
        socket.send(payload, protocol.port, protocol.address)
    },
    timeout
)