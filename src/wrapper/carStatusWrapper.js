import { Parser } from "binary-parser"
import { PacketHeaderWrapper } from './headerWrapper.js'

export class CarStatusWrapper {

    static name = 'carStatus'

    constructor(buffer) {
        this.buffer = buffer
        this.wrapper = () => {
            const statusParser = new Parser().endianess('little')
                .uint8('carStatusTractionControl')
                .uint8('carStatusAntiLockBrakes')
                .uint8('carStatusFuelMix')
                .uint8('carStatusFrontBrakeBias')
                .uint8('carStatusPitLimiterStatus')
                .floatle('carStatusFuelInTank')
                .floatle('carStatusFuelCapacity')
                .floatle('carStatusFuelRemainingLaps')
                .uint16le('carStatusMaxRPM')
                .uint16le('carStatusIdleRPM')
                .uint8('carStatusMaxGears')
                .uint8('carStatusDrsAllowed')
                .uint16le('carStatusDrsActivationDistance')
                .uint8('carStatusActualTyreCompound')
                .uint8('carStatusVisualTyreCompound')
                .uint8('carStatusTyresAgeLaps')
                .int8('carStatusVehicleFiaFlags')
                .floatle('carStatusEnginePowerICE')
                .floatle('carStatusEnginePowerMGUK')
                .floatle('carStatusERSStoreEnergy')
                .uint8('carStatusERSDeployMode')
                .floatle('carStatusERSHarvestedThisLapMGUK')
                .floatle('carStatusERSHarvestedThisLapMGUH')
                .floatle('carStatusERSDeployedThisLap')
                .uint8('carStatusNetworkPaused');

            return new Parser().endianess('little')
                .nest('raceHeader', { type: PacketHeaderWrapper })
                .array('carStatusData', {
                    type: statusParser,
                    length: 22
                });
        }
    }

    wrap() {
        return this.wrapper().parse(this.buffer)
    }
}