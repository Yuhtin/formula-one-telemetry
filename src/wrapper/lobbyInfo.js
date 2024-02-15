import { Parser } from "binary-parser"
import { PacketHeaderWrapper } from './headerWrapper.js'

export class LobbyInfoWrapper {

    static name = 'lobbyInfo'

    constructor(buffer) {
        this.buffer = buffer
        this.wrapper = () => {
            const infoParser = new Parser().endianess('little')
                .uint8('aiControlled')
                .uint8('teamId')
                .uint8('nationality')
                .uint8('platform')
                .string('name', { length: 48 })
                .uint8('carNumber')
                .uint8('readyStatus');

            return new Parser().endianess('little')
                .nest('raceHeader', { type: PacketHeaderWrapper })
                .uint8('numPlayers')
                .array('lobbyPlayers', {
                    type: infoParser,
                    length: 22
                });
        }
    }

    wrap() {
        return this.wrapper().parse(this.buffer)
    }
}