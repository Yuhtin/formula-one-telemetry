import { Parser } from "binary-parser"
import { PacketHeaderWrapper } from './headerWrapper.js'
import { getRaceEventStringCode } from "../utils.js"
import Event from "../event.js"

const event = new Event()

export class EventWrapper {

    name = 'event'

    constructor(buffer) {
        this.buffer = buffer
        this.eventStringCode = getRaceEventStringCode(buffer)
        this.wrapper = () => {
            const eventType = event.getEventByCode(this.eventStringCode)

            return new Parser().endianess('little')
                .nest('raceHeader', { type: PacketHeaderWrapper })
                .string('raceEventStringCode', { length: 4 })
                .nest('raceEventDetails', { type: eventType })
                .parse(msg);
        }
    }

    wrap() {
        return this.wrapper().parse(this.buffer)
    }
}