import { Parser } from "binary-parser"
import { PacketHeaderWrapper } from './headerWrapper.js'

export class LapDataWrapper {

    static name = 'lapData'

    constructor(buffer) {
        this.buffer = buffer
        this.wrapper = () => {
            const lapParser = new Parser().endianess('little')
                .uint32le('lapLastLapTimeInMS')
                .uint32le('lapCurrentLapTimeInMS')
                .uint16le('lapSector1TimeInMS')
                .uint8('lapSector1TimeMinutes')
                .uint16le('lapSector2TimeInMS')
                .uint8('lapSector2TimeMinutes')
                .uint16le('lapDeltaToCarInFrontInMS')
                .uint16le('lapDeltaToRaceLeaderInMS')
                .floatle('lapDistance')
                .floatle('lapTotalDistance')
                .floatle('lapSafetyCarDelta')
                .uint8('lapCarPosition')
                .uint8('lapCurrentLapNum')
                .uint8('lapPitStatus')
                .uint8('lapNumPitStops')
                .uint8('lapSector')
                .uint8('lapCurrentLapInvalid')
                .uint8('lapPenalties')
                .uint8('lapTotalWarnings')
                .uint8('lapCornerCuttingWarnings')
                .uint8('lapNumUnservedDriveThroughPens')
                .uint8('lapNumUnservedStopGoPens')
                .uint8('lapGridPosition')
                .uint8('lapDriverStatus')
                .uint8('lapResultStatus')
                .uint8('lapPitLaneTimerActive')
                .uint16le('lapPitLaneTimeInLaneInMS')
                .uint16le('lapPitStopTimerInMS')
                .uint8('lapPitStopShouldServePen');

            return new Parser().endianess('little')
                .nest('raceHeader', { type: PacketHeaderWrapper })
                .array('lapData', {
                    type: lapParser,
                    length: 22
                })
                .uint8('lapTimeTrialPBCarIdx')
                .uint8('lapTimeTrialRivalCarIdx');
        }
    }

    wrap() {
        return this.wrapper().parse(this.buffer)
    }
}