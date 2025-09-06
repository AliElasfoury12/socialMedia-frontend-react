
function countRound (Count) {

    if (Count == 0 || Count < 1000) {
        return Count
    }

    if(Count >= 1000 && Count < 1000*1000 ) {
        return (Count/1000).toFixed(1) +'k'
    }
  
    if(Count >= 100*1000*1000-1 && Count < 1000*1000*1000){
        return (Count/(1000*1000)).toFixed(1)  + 'M'
    }

    if(Count >= 1000*1000*1000){
        return (Count/(1000*1000*1000)).toFixed(1) + 'B'
    }
 
  }

  export default countRound
