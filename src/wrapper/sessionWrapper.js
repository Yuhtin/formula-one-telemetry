import { Parser } from "binary-parser"
import { PacketHeaderWrapper } from './headerWrapper.js'

export class SessionWrapper {
    constructor(buffer) {
        this.buffer = buffer
        this.wrapper = () => {
            const MarshalZoneParser = new Parser().endianess('little')
                .floatle('raceZoneStart')
                .int8('raceZoneFlag');

            const WeatherForecastSampleParser = new Parser().endianess('little')
                .uint8('raceSessionType')
                .uint8('raceTimeOffset')
                .uint8('raceWeather')
                .int8('raceTrackTemperature')
                .int8('raceTrackTemperatureChange')
                .int8('raceAirTemperature')
                .int8('raceAirTemperatureChange')
                .uint8('raceRainPercentage');

            return new Parser().endianess('little')
                .nest('raceHeader', { type: new PacketHeaderWrapper(buffer).wrapper })
                .uint8('raceWeather')
                .int8('raceTrackTemperature')
                .int8('raceAirTemperature')
                .uint8('raceTotalLaps')
                .uint16le('raceTrackLength')
                .uint8('raceSessionType')
                .int8('raceTrackId')
                .uint8('raceFormula')
                .uint16le('raceSessionTimeLeft')
                .uint16le('raceSessionDuration')
                .uint8('racePitSpeedLimit')
                .uint8('raceGamePaused')
                .uint8('raceIsSpectating')
                .uint8('raceSpectatorCarIndex')
                .uint8('raceSliProNativeSupport')
                .uint8('raceNumMarshalZones')
                .array('raceMarshalZones', {
                    type: MarshalZoneParser,
                    length: 21
                })
                .uint8('raceSafetyCarStatus')
                .uint8('raceNetworkGame')
                .uint8('raceNumWeatherForecastSamples')
                .array('raceWeatherForecastSamples', {
                    type: WeatherForecastSampleParser,
                    length: 56
                })
                .uint8('raceForecastAccuracy')
                .uint8('raceAiDifficulty')
                .uint32le('raceSeasonLinkIdentifier')
                .uint32le('raceWeekendLinkIdentifier')
                .uint32le('raceSessionLinkIdentifier')
                .uint8('racePitStopWindowIdealLap')
                .uint8('racePitStopWindowLatestLap')
                .uint8('racePitStopRejoinPosition')
                .uint8('raceSteeringAssist')
                .uint8('raceBrakingAssist')
                .uint8('raceGearboxAssist')
                .uint8('racePitAssist')
                .uint8('racePitReleaseAssist')
                .uint8('raceERSAssist')
                .uint8('raceDRSAssist')
                .uint8('raceDynamicRacingLine')
                .uint8('raceDynamicRacingLineType')
                .uint8('raceGameMode')
                .uint8('raceRuleSet')
                .uint32le('raceTimeOfDay')
                .uint8('raceSessionLength')
                .uint8('raceSpeedUnitsLeadPlayer')
                .uint8('raceTemperatureUnitsLeadPlayer')
                .uint8('raceSpeedUnitsSecondaryPlayer')
                .uint8('raceTemperatureUnitsSecondaryPlayer')
                .uint8('raceNumSafetyCarPeriods')
                .uint8('raceNumVirtualSafetyCarPeriods')
                .uint8('raceNumRedFlagPeriods');
        }
    }

    wrap() {
        return this.wrapper().parse(this.buffer)
    }
}