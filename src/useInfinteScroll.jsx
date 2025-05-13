import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function useInfinteScroll(page, setPage, infinteScrollFun, elementId, type) {
    let dispatch = useDispatch()

    useEffect(() => {

        if(elementId) {
            let element = document.getElementById(elementId) 

            let handelScroll = () => {         
                if(Number(element.clientHeight) + Number(element.scrollTop.toFixed()) + 1 >= Number(element.scrollHeight) ){            
                    type ? setPage((p) => p + 1) : dispatch(setPage()) 
               }
            }
      
            element.addEventListener('scroll',handelScroll)
            return () => element.removeEventListener('scroll', handelScroll)

        }else{
            let handelScroll = () => {
                let doc = document.documentElement

                if(window.innerHeight + doc.scrollTop + 1 >= doc.scrollHeight ){
                    type ? setPage((p) => p + 1) : dispatch(setPage()) 
                }
            }
    
            window.addEventListener('scroll', handelScroll)
            return () => window.removeEventListener('scroll', handelScroll)
        }
    },[])

    useEffect(() => {        
        infinteScrollFun()
    }, [page])
}


