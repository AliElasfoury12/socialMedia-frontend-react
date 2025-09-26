const date = new Date();

const timeStamps = date.toLocaleString().replace(',','').replace(' AM', '').replace(' PM', '')

console.log(timeStamps)