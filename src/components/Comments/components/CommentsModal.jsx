import { X } from "lucide-react"
import CommentsShow from "./CommentsShow"
import CreateComment from "./CreateComment"
import { useDispatch } from "react-redux"
import { setShow } from '../../../stores/commentStore'
import { useEffect } from "react"

export default function CommentsModal() {
    let dispatch = useDispatch()
    
    let close = () => {
        document.body.classList.remove('disableScrolling')
        dispatch(setShow(false))
    }

    window.onclick = (e) => {
        let modal = document.getElementById('modal')
        e.target == modal && close()         
    }

    useEffect(() => {
        document.body.classList.add('disableScrolling')
    },[])
    
  return (
    <div  
        id="modal"
        className=" fixed w-full h-full z-10 top-0 left-0 
        grid place-content-center bg-black bg-opacity-20 ">

        <div className="bg-slate-200 w-fit h-fit flex flex-col p-4 rounded-md ">

            <button onClick={close}
                className=" bg-red-600 rounded-full p-1  w-6 h-6 self-end mt-2 mr-2">
                <X className='w-4 h-4'/>
            </button>

            <div
                className=" flex flex-col w-fit border-black  border-2 rounded-xl
                            my-3 py-1 px-2 min-w-80 m-auto">
                <CommentsShow/> 
                <CreateComment/>       
            </div>

        </div>
    </div>
         
  )
}