

const countRound = (Count) => {

    if (Count == 0) {
        return 0
    }

    if(Count < 1000){
        return Count 
    }

    if(Count >= 1000 && Count < 10*1000-1 ) {
        Count = (Count/1000).toFixed(1) +'k'
    }

    if(Count >= 10*1000-1 && Count < 100*1000-1 ) {
        Count = (Count/1000).toFixed(1) +'k'
    }

    if(Count >= 100*1000-1 && Count < 1000*1000-1 ) {
        Count = (Count/1000).toFixed(1) +'k'
    }
  
    if(Count >= 1000*1000-1 && Count < 10*1000*1000-1){
        Count = (Count/(1000*1000)).toFixed(1)  + 'M'
    }

    if(Count >= 10*1000*1000-1 && Count < 100*1000*1000-1){
        Count = (Count/(1000*1000)).toFixed(1)  + 'M'
    }

    if(Count >= 100*1000*1000-1 && Count < 1000*1000*1000-1){
        Count = (Count/(1000*1000)).toFixed(1)  + 'M'
    }

    if(Count >= 1000*1000*1000-1){
        Count = (Count/(1000*1000*1000)).toFixed(1) + 'B'
    }

   

 
    return Count
  }

  export default countRound
