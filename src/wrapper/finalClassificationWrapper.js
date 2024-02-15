import { Parser } from "binary-parser"
import { PacketHeaderWrapper } from './headerWrapper.js'

export class FinalClassificationWrapper {

    static name = 'finalClassification'

    constructor(buffer) {
        this.buffer = buffer
        this.wrapper = () => {
            const classificationParser = new Parser().endianess('little')
                .uint8('driverPosition')
                .uint8('driverNumLaps')
                .uint8('driverGridPosition')
                .uint8('driverPoints')
                .uint8('driverNumPitStops')
                .uint8('driverResultStatus')
                .uint32le('driverBestLapTimeInMS')
                .floatle('driverTotalRaceTime')
                .uint8('driverPenaltiesTime')
                .uint8('driverNumPenalties')
                .uint8('driverNumTyreStints')
                .array('driverTyreStintsActual', {
                    type: 'uint8',
                    length: 8
                })
                .array('driverTyreStintsVisual', {
                    type: 'uint8',
                    length: 8
                })
                .array('driverTyreStintsEndLaps', {
                    type: 'uint8',
                    length: 8
                });

            return new Parser().endianess('little')
                .nest('raceHeader', { type: PacketHeaderWrapper })
                .uint8('raceNumCars')
                .array('driverClassificationData', {
                    type: classificationParser,
                    length: 22
                });
        }
    }

    wrap() {
        return this.wrapper().parse(this.buffer)
    }
}