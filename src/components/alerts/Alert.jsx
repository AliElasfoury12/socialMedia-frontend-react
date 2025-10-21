import PropTypes from 'prop-types'
import { useEffect } from "react"
import ShowIf from '../Common/ShowIf'

export default function Alert ({show, setShow, children}) {
    function enableScrolling() {
        document.body.classList.remove('disableScrolling')
    }

    function disableScrolling() {
        document.body.classList.add('disableScrolling')
    }

    function close () {
        enableScrolling()
        setShow(false)
    }

    useEffect(() => {
        if(show) disableScrolling()
        else enableScrolling()
    },[show])
  
    return (
        <ShowIf show={show}>
            <div
                onClick={close}
                className="fixed w-full h-full z-10 top-0 left-0 
                grid place-content-center bg-black bg-opacity-60 mt-6 ">
                    
                <div 
                    className="bg-slate-200 w-fit min-w-96 h-fit flex flex-col p-4 rounded-md">
        
                    <div
                        className=" flex flex-col w-fit bg-gray-200 rounded-xl my-3 py-1 m-auto max-w-[45rem] max-h-[30rem]">
                        {children}
                    </div>
        
                </div>
            </div>     
        </ShowIf>
    )
}

Alert.propTypes = {
    show: PropTypes.bool,
    setShow: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}