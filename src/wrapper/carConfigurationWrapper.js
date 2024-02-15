import { Parser } from "binary-parser"
import { PacketHeaderWrapper } from './headerWrapper.js'

export class CarConfigurationWrapper {
    constructor(buffer) {
        this.buffer = buffer
        this.wrapper = () => {
            const configurationParser = new Parser().endianess('little')
                .uint8('carFrontWing')
                .uint8('carRearWing')
                .uint8('carOnThrottle')
                .uint8('carOffThrottle')
                .floatle('carFrontCamber')
                .floatle('carRearCamber')
                .floatle('carFrontToe')
                .floatle('carRearToe')
                .uint8('carFrontSuspension')
                .uint8('carRearSuspension')
                .uint8('carFrontAntiRollBar')
                .uint8('carRearAntiRollBar')
                .uint8('carFrontSuspensionHeight')
                .uint8('carRearSuspensionHeight')
                .uint8('carBrakePressure')
                .uint8('carBrakeBias')
                .floatle('carRearLeftTyrePressure')
                .floatle('carRearRightTyrePressure')
                .floatle('carFrontLeftTyrePressure')
                .floatle('carFrontRightTyrePressure')
                .uint8('carBallast')
                .floatle('carFuelLoad');

            return new Parser().endianess('little')
                .nest('raceHeader', { type: PacketHeaderWrapper })
                .array('carSetups', {
                    type: configurationParser,
                    length: 22
                });
        }
    }

    wrap() {
        return this.wrapper().parse(this.buffer)
    }
}