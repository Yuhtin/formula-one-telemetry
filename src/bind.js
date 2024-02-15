import { SessionWrapper } from './wrapper/sessionWrapper.js'
import { MotionWrapper } from './wrapper/motionWrapper.js'
import { LapDataWrapper } from './wrapper/lapDataWrapper.js'
import { EventWrapper } from './wrapper/eventWrapper.js'
import { DriversWrapper } from './wrapper/driversWrapper.js'
import { CarConfigurationWrapper } from './wrapper/carConfigurationWrapper.js'
import { CarTelemetryWrapper } from './wrapper/carTelemetryWrapper.js'
import { CarStatusWrapper } from './wrapper/carStatusWrapper.js'
import { FinalClassificationWrapper } from './wrapper/finalClassificationWrapper.js'
import { LobbyInfoWrapper } from './wrapper/lobbyInfo.js'

const WRAPPER_BY_BYTE_SIZE = {

    1349: MotionWrapper,
    644: SessionWrapper,
    1131: LapDataWrapper,
    45: EventWrapper,
    1306: DriversWrapper,
    1107: CarConfigurationWrapper,
    1352: CarTelemetryWrapper,
    1239: CarStatusWrapper,
    1020: FinalClassificationWrapper,
    1218: LobbyInfoWrapper,
    carDamage: 953,
    sessionHistory: 1460,
    tyreSets: 231,
    motionEx: 217
  
}

export default function bindWrapper(byteSize) {
    return WRAPPER_BY_BYTE_SIZE[byteSize]
}