import { useEffect } from 'react'

export default function useInfinteScroll(infinteScrollFun, elementId) {

    function infinteScrolleInDiv () {
        const element = document.getElementById(elementId)

        const handelScroll = () => {         
            if(Number(element.clientHeight) + Number(element.scrollTop.toFixed()) + 1 >= Number(element.scrollHeight) ) 
                infinteScrollFun()            
        }
    
        element.addEventListener('scroll',handelScroll)
        return () => element.removeEventListener('scroll', handelScroll)
    }

    function infinteScroll() {
        const handelScroll = () => {
            const doc = document.documentElement
            if( window.innerHeight + doc.scrollTop >= doc.scrollHeight ) infinteScrollFun()                
        }

        window.addEventListener('scroll', handelScroll)
        return () => window.removeEventListener('scroll', handelScroll)
    }

    useEffect(() => {        
        if(elementId) 
           infinteScrolleInDiv()
        else
           infinteScroll()

        infinteScrollFun()
    },[])
}


