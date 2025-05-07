export function emptyObject (object) {
    if(Object.keys(object).length === 0) return true
    else return false
}

export function equelObjects (object1, object2) {
    return JSON.stringify(object1) == JSON.stringify(object2)
}

export function isObject (object) {
    return typeof object == 'object'
}