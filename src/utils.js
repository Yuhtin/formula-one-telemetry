import { PacketHeaderWrapper } from "./wrapper/headerWrapper.js";

export function toJsonString(data) {
    return JSON.stringify(data, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)
}

export function getRaceEventStringCode(buffer) {
    const headerParser = new Parser().endianess('little').nest('raceHeader', { type: PacketHeaderWrapper }).string('raceEventStringCode', { length: 4 });
    const { raceEventStringCode } = headerParser.parse(buffer);

    return raceEventStringCode;
};