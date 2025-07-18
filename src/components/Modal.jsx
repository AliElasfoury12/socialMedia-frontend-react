import { X } from "lucide-react"
import { useEffect } from "react"
import PropTypes from 'prop-types'
import { useDispatch } from "react-redux"

export default function Modal(props) {
    let dispatch = useDispatch()
    let {show, setShow, type, children} = props

    let close = () => {
        document.body.classList.remove('disableScrolling')
        if(type === 'dispatch'){
            dispatch(setShow(false))
        }else{
            setShow(false)
        }
    }

    useEffect(() => {
       if(show) document.body.classList.add('disableScrolling')
    },[show])

    window.onclick = (e) => {
        if(e.target === document.getElementById('modal')) {
            close()
        }
    }
    
  return (
    <>
        {show && 
            <div 
                id="modal" 
                className="fixed w-full h-full z-10 top-0 left-0 
                grid place-content-center bg-black bg-opacity-20 mt-6 ">
                    
                <div 
                    className="bg-slate-200 w-fit h-fit flex flex-col p-4 rounded-md"
                   >
        
                    <button onClick={close}
                        className=" bg-red-600 rounded-full p-1  w-6 h-6 self-end mt-2 mr-2">
                        <X className='w-4 h-4'/>
                    </button>
        
                    <div
                        className=" flex flex-col w-fit border-black  border-2 rounded-xl
                                    my-3 py-1 m-auto"
                        style={{maxWidth: '45rem', maxHeight: '30rem'}}>
                          {children}
                    </div>
        
                </div>
                
            </div>     
        }
    </>
  )
}

Modal.propTypes = {
    show: PropTypes.bool,
    setShow: PropTypes.func,
    type: PropTypes.string,
    children: PropTypes.object
}
