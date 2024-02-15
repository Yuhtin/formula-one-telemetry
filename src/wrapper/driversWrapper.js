import { Parser } from "binary-parser"
import { PacketHeaderWrapper } from './headerWrapper.js'

export class DriversWrapper {
    constructor(buffer) {
        this.buffer = buffer
        this.wrapper = () => {
            const ParticipantDataParser = new Parser().endianess('little')
              .uint8('driverAiControlled')
              .uint8('driverId')
              .uint8('driverNetworkId')
              .uint8('driverTeamId')
              .uint8('driverMyTeam')
              .uint8('driverRaceNumber')
              .uint8('driverNationalty')
              .string('driverName', { length: 48 })
              .uint8('driverYourTelemetry')
              .uint8('driverShowOnlineNames')
              .uint8('driverPlatform');

            return new Parser().endianess('little')
              .nest('raceHeader', { type: PacketHeaderParser })
              .uint8('raceNumActiveCars')
              .array('raceDrivers', {
                type: ParticipantDataParser,
                length: 22
              });
        }
    }

    wrap() {
        return this.wrapper().parse(this.buffer)
    }
}