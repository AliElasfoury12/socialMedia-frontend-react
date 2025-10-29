import { X } from "lucide-react"
import { useEffect } from "react"
import PropTypes from 'prop-types'
import ShowIf from '../Common/ShowIf'

export default function Modal({show, setShow, children}) {
    let id = 0
    
    function get_modal_id () {
        if(show) {
            for (let i = 1; i < 1000; i++) {
                id = document.getElementById(`modal-${i}`)            
                if (!id) {
                    id = i
                    break
                }
            }
        }
    }

    get_modal_id()
    
    function enableScrolling() {
        const is_any_model_open = document.getElementById('modal-1')
        if(is_any_model_open == null)document.body.style.overflow = 'auto'
    }

    const disableScrolling = () => {
       if(show) document.body.style.overflow = 'hidden'
    }

    function close () {
        setShow(false)
    }

    useEffect(() => {
        disableScrolling()
        return () => enableScrolling()
    },[show])

    return (
        <ShowIf show={show}>
            <div
                id={`modal-${id}`}
                onClick={close}
                className="fixed w-full h-full z-30 -top-6 left-0
                grid place-content-center bg-black bg-opacity-60 mt-6 ">
                    
                <div 
                    onClick={(e) => e.stopPropagation()}
                    className="bg-slate-200 w-fit h-fit flex flex-col p-4 rounded-md">
        
                    <button onClick={close}
                        className=" bg-red-600 rounded-full p-1  w-6 h-6 self-end mt-2 mr-2">
                        <X className='w-4 h-4'/>
                    </button>
        
                    <div
                        className=" flex flex-col w-fit bg-gray-200 rounded-xl my-3 py-1 m-auto max-w-[45rem] max-h-[30rem]">
                        {children}
                    </div>
        
                </div>
            </div>     
        </ShowIf>
    )
}

Modal.propTypes = {
    show: PropTypes.bool,
    setShow: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
