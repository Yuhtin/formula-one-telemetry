import { SessionWrapper } from './wrapper/sessionWrapper.js'

const PACKET_WRAPPERS = {

    motion: 1349,
    644: SessionWrapper,
    lapData: 1131,
    event: 45,
    participants: 1306,
    carSetups: 1107,
    carTelemetry: 1352,
    carStatus: 1239,
    finalClassification: 1020,
    lobbyInfo: 1218,
    carDamage: 953,
    sessionHistory: 1460,
    tyreSets: 231,
    motionEx: 217
  
}

export default function bindWrapper(byteSize) {
    return PACKET_WRAPPERS[byteSize]
}