export function toJsonString(data) {
    return JSON.stringify(data, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)
}