import { useEffect } from 'react'

export default function useInfinteScroll(infinteScrollFun, firstMount, elementId) {
    function isReachToLastElementInDiv (element) {
       return Number(element.clientHeight) + Number(element.scrollTop.toFixed()) >= Number(element.scrollHeight) 
    }
   
    function infinteScrolleInDiv () {
        const element = document.getElementById(elementId)
        const handelScroll = () => { if(isReachToLastElementInDiv(element) && !firstMount) infinteScrollFun() } 
    
        element.addEventListener('scroll',handelScroll)
        return () => element.removeEventListener('scroll', handelScroll)
    }

    function isReachToLastElementInDocument () {
        const doc = document.documentElement
       return window.innerHeight + doc.scrollTop >= doc.scrollHeight
    }

    function infinteScroll() {
        const handelScroll = () => { if( isReachToLastElementInDocument() && !firstMount ) infinteScrollFun() } 

        window.addEventListener('scroll', handelScroll)
        return () => window.removeEventListener('scroll', handelScroll)
    }

    useEffect(() => {  
        if(firstMount) infinteScrollFun()
      
        if(elementId) 
            return infinteScrolleInDiv()
        else
            return infinteScroll()

    },[firstMount])
}
