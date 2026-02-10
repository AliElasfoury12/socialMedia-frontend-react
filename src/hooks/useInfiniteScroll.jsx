import { useEffect } from 'react'

export default function useInfiniteScroll(infiniteScrollFun, hasNoData, elementId) {
    
    function isReachToLastElementInDiv (element) {
       return Number(element.clientHeight) + Number(element.scrollTop.toFixed()) >= Number(element.scrollHeight) 
    }
   
    function infiniteScrollInDiv () {
        const element = document.getElementById(elementId)
        const handelScroll = () => { if(isReachToLastElementInDiv(element) && !hasNoData) infiniteScrollFun() } 
    
        element.addEventListener('scroll',handelScroll)
        return () => element.removeEventListener('scroll', handelScroll)
    }

    function isReachToLastElementInDocument () {
        const doc = document.documentElement
       return window.innerHeight + doc.scrollTop >= doc.scrollHeight
    }

    function infiniteScroll() {
        const handelScroll = () => { if(isReachToLastElementInDocument() && !hasNoData) infiniteScrollFun() } 

        window.addEventListener('scroll', handelScroll)
        return () => window.removeEventListener('scroll', handelScroll)
    }

    useEffect(() => {  
        if(hasNoData) infiniteScrollFun()
      
        if(elementId) 
            return infiniteScrollInDiv()
        else
            return infiniteScroll()

    },[hasNoData])
}
