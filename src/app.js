import dgram from 'node:dgram'
const server = dgram.createSocket('udp4');
import fs from 'fs'
import bindWrapper from './bind.js'
import { toJsonString } from './utils.js';

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
})

server.on('message', (buffer, info) => {
  const Wrapper = bindWrapper(info.size)
  if (Wrapper == null) return

  const data = new Wrapper(buffer).wrap()
  console.log(data)

  // just to test
  if (!fs.existsSync('./logs/data.txt')) {
    fs.writeFile('./logs/data.txt', toJsonString(data) + "\n\n", { flag: 'a+' }, err => { });
  }
})

server.bind(20777)