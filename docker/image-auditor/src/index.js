const protocol = require('./protocol');
const musician = require('./musician');
const net = require('net');

// We use a standard Node.js module to work with UDP
const dgram = require('dgram');

const TCP_PORT = 2205;

// Active musicians
let musicians = [];
let musicians_activity = [];

// Let's create a datagram socket. We will use it to listen for datagrams published in the
// multicast group by thermometers and containing measures
const s = dgram.createSocket('udp4');
s.bind(protocol.port, () => {
    console.log("Joining multicast group");
    s.addMembership(protocol.address);
});

// TCP server
var tcp_socket = net.createServer();
tcp_socket.listen(TCP_PORT);

tcp_socket.on('connection', (socket) => {
    socket.write(JSON.stringify(musicians));
    socket.end();
});

// This call back is invoked when a new datagram has arrived.
s.on('message', (msg, source) => {
  var data = JSON.parse(msg, null, 2);

  let found = false;

  // Update lastActivity
  musicians_activity.forEach((item, index, array) => {
    if (item.uuid = data.uuid) {
      item.activeSince = Date(Date.now());
      found = true;
    }
  });

  // Insert a new Musician if not in the list
  if (!found) {
    let instrument;
    for ([key, val] of Object.entries(protocol.instruments))
    {
      if (val == data.sound) {
        instrument = key;
        break;
      }
    }
    musicians.push(new musician.Musician(data.uuid, instrument, Date.now()));
    musicians_activity.push(new musician.MusicianActivity(data.uuid, Date.now()));
  }
});

setInterval(() => {
  musicians_activity.forEach((item, index, array) => {
    if (Date.now() - item.lastActivity > 5000) {
      musicians.splice(index, 1);
      musicians_activity.splice(index, 1);
    }
  });
}, 100);
