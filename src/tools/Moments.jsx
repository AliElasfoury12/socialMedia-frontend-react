import moment from "moment";

export function timeAgo (time) {
    let newTime =  moment(time).fromNow()

    newTime = newTime.replace('ago','')

    newTime = newTime.replace('minutes','m')

    newTime = newTime.replace('minute','m')

    newTime = newTime.replace('hours','h')

    newTime = newTime.replace('hour','h')

    newTime = newTime.replace('days','d')

    newTime = newTime.replace('day','d')

    newTime = newTime.replace('months','month')

    newTime = newTime.replace('years','y')

    newTime = newTime.replace('year','y')

    newTime = newTime.replace('in','')

    if (!newTime.includes('few')){
        newTime = newTime.replace('an','1')
        newTime = newTime.replace('a','1')
    }else{
        newTime = newTime.replace('a','')
    }

    newTime = newTime.replace(' ','')

    return  newTime
}