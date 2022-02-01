class Musician {
  constructor(uuid, instrument, activeSince) {
    this.uuid = uuid;
    this.instrument = instrument;
    this.activeSince = activeSince;
  }
}

class MusicianActivity {
  constructor(uuid, lastActivity) {
    this.uuid = uuid;
    this.lastActivity;
  }
}

module.exports = { Musician, MusicianActivity };