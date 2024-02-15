import { Parser } from "binary-parser"
import { PacketHeaderWrapper } from './headerWrapper.js'

export class CarTelemetryWrapper {
    constructor(buffer) {
        this.buffer = buffer
        this.wrapper = () => {
            const telemetryParser = new Parser().endianess('little')
                .uint16le('carSpeed')
                .floatle('carThrottle')
                .floatle('carSteer')
                .floatle('carBrake')
                .uint8('carClutch')
                .int8('carGear')
                .uint16le('carEngineRPM')
                .uint8('carDRS')
                .uint8('carRevLightsPercent')
                .uint16le('carRevLightsBitValue')
                .array('carBrakesTemperature', {
                    type: 'uint16le',
                    length: 4
                })
                .array('carTyresSurfaceTemperature', {
                    type: 'uint8',
                    length: 4
                })
                .array('carTyresInnerTemperature', {
                    type: 'uint8',
                    length: 4
                })
                .uint16le('carEengineTemperature')
                .array('carTyresPressure', {
                    type: 'floatle',
                    length: 4
                })
                .array('carSurfaceType', {
                    type: 'uint8',
                    length: 4
                });

            return new Parser().endianess('little')
                .nest('raceHeader', { type: PacketHeaderWrapper })
                .array('carTelemetryData', {
                    type: telemetryParser,
                    length: 22
                })
                .uint8('carMfdPanelIndex')
                .uint8('carMfdPanelIndexSecondaryPlayer')
                .int8('carSuggestedGear');
        }
    }

    wrap() {
        return this.wrapper().parse(this.buffer)
    }
}