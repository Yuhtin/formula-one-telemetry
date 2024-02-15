import dgram from 'node:dgram'
const server = dgram.createSocket('udp4');
import fs from 'fs'
import bindWrapper from './bind.js'

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
})

server.on('message', (buffer, info) => {
  let Wrapper = bindWrapper(info.size)
  if (Wrapper == null) return

  const data = new Wrapper(buffer).wrap()
  console.log(data)

  // just to test
  if (!fs.existsSync('data.txt')) {
    fs.writeFile('data.txt', toJsonString(data) + "\n\n")
  }
})

server.bind(20777)