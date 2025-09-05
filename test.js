const input = '12f'


function isNumber (value) {
    const num = Number(value.trim())
    if(value !== '' && !isNaN(num)) return true
    return false
}

console.log(isNumber(input));


