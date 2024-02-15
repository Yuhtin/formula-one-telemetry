import dgram from 'node:dgram'
const server = dgram.createSocket('udp4');
import fs from 'fs'

import { SessionWrapper } from './wrapper/sessionWrapper.js'

const PACKET_WRAPPERS = {

  motion: 1349,
  644: SessionWrapper,
  lapData: 1131,
  event: 45,
  participants: 1306,
  carSetups: 1107,
  carTelemetry: 1352,
  carStatus: 1239,
  finalClassification: 1020,
  lobbyInfo: 1218,
  carDamage: 953,
  sessionHistory: 1460,
  tyreSets: 231,
  motionEx: 217

};

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.on('message', (msg, info) => {
  let wrapper = PACKET_WRAPPERS[info.size]
  if (wrapper == null) return

  const data = new wrapper(msg).wrap()
  console.log(data)

  if (!fs.existsSync('data.txt')) {
    fs.writeFile('data.txt', toJsonString(data) + "\n\n", { flag: 'a+' }, err => { });
  }
});

server.bind(20777);