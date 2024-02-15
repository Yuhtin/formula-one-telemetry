import { Parser } from "binary-parser"
import { PacketHeaderWrapper } from './headerWrapper.js'
import { getRaceEventStringCode } from "../utils.js"

export class EventWrapper {

    static name = 'event'

    constructor(buffer) {
        this.buffer = buffer
        this.eventStringCode = getRaceEventStringCode(buffer)
        this.wrapper = () => {
            const eventType = Event.EVENT_BY_CODE[this.eventStringCode]

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


class Event {

    static EVENT_BY_CODE = {

        "FTLP": this.FastestLapEvent,
        "RTMT": this.RetirementEvent,
        "TMPT": this.TeamMateInPitsEvent,
        "RCWN": this.RaceWinnerEvent,
        "PENA": this.PenaltyEvent,
        "SPTP": this.SpeedTrapEvent,
        "STLG": this.StartLightsEvent,
        "DTSV": this.DriveThroughPenaltyServedEvent,
        "SGSV": this.StopGoPenaltyServedEvent,
        "FLBK": this.FlashbackEvent,
        "BUTN": this.ButtonsEvent,
        "OTVK": this.OvertakeEvent,

    }

    FastestLapEvent = new Parser().endianess('little')
        .uint8('vehicleIdx')
        .floatle('lapTime')

    RetirementEvent = new Parser().endianess('little')
        .uint8('vehicleIdx');

    TeamMateInPitsEvent = new Parser().endianess('little')
        .uint8('vehicleIdx');

    RaceWinnerEvent = new Parser().endianess('little')
        .uint8('vehicleIdx');

    PenaltyEvent = new Parser().endianess('little')
        .uint8('penaltyType')
        .uint8('infringementType')
        .uint8('vehicleIdx')
        .uint8('otherVehicleIdx')
        .uint8('time')
        .uint8('lapNum')
        .uint8('placesGained');

    SpeedTrapEvent = new Parser().endianess('little')
        .uint8('vehicleIdx')
        .floatle('speed')
        .uint8('isOverallFastestInSession')
        .uint8('isDriverFastestInSession')
        .uint8('fastestVehicleIdxInSession')
        .floatle('fastestSpeedInSession');

    StartLightsEvent = new Parser().endianess('little')
        .uint8('numLights');

    DriveThroughPenaltyServedEvent = new Parser().endianess('little')
        .uint8('vehicleIdx');

    StopGoPenaltyServedEvent = new Parser().endianess('little')
        .uint8('vehicleIdx');

    FlashbackEvent = new Parser().endianess('little')
        .uint32le('flashbackFrameIdentifier')
        .floatle('flashbackSessionTime');

    ButtonsEvent = new Parser().endianess('little')
        .uint32le('buttonStatus');

    OvertakeEvent = new Parser().endianess('little')
        .uint8('overtakingVehicleIdx')
        .uint8('beingOvertakenVehicleIdx');

}