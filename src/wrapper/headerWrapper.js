import { Parser } from "binary-parser"

export class PacketHeaderWrapper {
    constructor(buffer) {
        this.buffer = buffer
        this.wrapper = new Parser().endianess('little')
            .uint16('packetFormat')
            .uint8('gameYear')
            .uint8('gameMajorVersion')
            .uint8('gameMinorVersion')
            .uint8('packetVersion')
            .uint8('packetId')
            .uint64('sessionUid')
            .floatle('sessionTime')
            .uint32('frameIdentifier')
            .uint32('overallFrameIdentifier')
            .uint8('playerCarIndex')
            .uint8('secondaryPlayerCarIndex');
    }

    wrap() {
        return this.wrapper.parse(buffer)
    }
}