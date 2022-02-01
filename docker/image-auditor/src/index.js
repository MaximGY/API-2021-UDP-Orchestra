const protocol = require('./protocol');
const ll = require('./linked-list');
const musician = require('./musician');

// We use a standard Node.js module to work with UDP
const dgram = require('dgram');


// Active musicians
const list = new ll.LinkedList();

// Let's create a datagram socket. We will use it to listen for datagrams published in the
// multicast group by thermometers and containing measures
const s = dgram.createSocket('udp4');
s.bind(protocol.port, () => {
    console.log("Joining multicast group");
    s.addMembership(protocol.address);
});

// This call back is invoked when a new datagram has arrived.
s.on('message', (msg, source) => {
  var data = JSON.stringify(msg, null, 2);

  console.log(data);

  // Update activeSince
  let found = false;
  let current = list.head;
  while(current != null) {
    if (current.data.uuid = data.uuid) {
      current.data.activeSince = Date.now();
      found = true;
      break;
    }
    current = current.next;
  }

  // Insert a new Musician if not in the list
  if (!found) {
    var instrument = 0;
    list.insertHead(new musician.Musician(data.uuid, instrument, Date.now));
  }
});

setInterval(() => {
  const now = Date.now();

  let current = list.head;
  let previous;
  while(current != null) {
    const ms = now - current.data.time;
    if (ms > 5000) {
      previous.next = current.next
    } else {
      previous = current;
    }
    current = current.next;
  }
}, 100);
