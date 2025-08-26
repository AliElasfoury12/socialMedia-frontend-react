export function isString (variable) {
    return typeof variable == 'string'
}

export function firstToUpper (string) {
    return string[0].toUpperCase() + string.slice(1)
}