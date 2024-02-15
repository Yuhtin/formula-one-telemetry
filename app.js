import dgram from 'node:dgram'
const server = dgram.createSocket('udp4');

import { Parser } from "binary-parser"

import fs from 'fs'

const PACKET_SIZES = {

  motion: 1349,
  session: 644,
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
};

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

function toJsonString(data) {
  return JSON.stringify(data, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)
}

server.on('message', (msg, rinfo) => {
  const PacketHeaderParser = new Parser().endianess('little')
    .uint16('packetFormat')
    .uint8('gameYear')
    .uint8('gameMajorVersion')
    .uint8('gameMinorVersion')
    .uint8('packetVersion')
    .uint8('packetId')
    .uint64('sessionUid')
    .floatle('sessionTime')
    .uint32('frameIdentifier')
    .uint32('overallFrameIdentifier')
    .uint8('playerCarIndex')
    .uint8('secondaryPlayerCarIndex');

  const packetFormat = msg.readUInt16LE(0);

  function getEventStringCode(buffer) {
    const headerParser = new Parser().endianess('little').nest('raceHeader', { type: PacketHeaderParser }).string('raceEventStringCode', { length: 4 });
    const { mEventStringCode } = headerParser.parse(buffer);
    return mEventStringCode;
  };

  switch (rinfo.size) {
    case PACKET_SIZES.session: {
      let MarshalZoneParser = new Parser().endianess('little')
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


      const PacketSessionDataParser = new Parser().endianess('little')
        .nest('raceHeader', { type: PacketHeaderParser })
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
        .uint8('race_ERSAssist')
        .uint8('race_DRSAssist')
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

      let data = PacketSessionDataParser.parse(msg)
      console.log(data)

      if (!fs.existsSync('data.txt')) {
        fs.writeFile('data.txt', toJsonString(data) + "\n\n", { flag: 'a+' }, err => { });
      }
    }
  }
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(20777);