export function currentTimeStamp () {
    const date = new Date();
    return date.toLocaleString().replace(',','').replace(' AM', '').replace(' PM', '')
}