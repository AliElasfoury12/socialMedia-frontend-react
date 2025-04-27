import { useState } from "react"
import PostsShow from "./components/PostsShow"
import CreatePost from "./components/createPost/CreatePost"
import Modal from "../../Modal"

export default function Posts() {
    let [show, setShow] = useState(false)

    let component = () =>{
        return <CreatePost setShow={setShow}/>
    }

    return(
        <div
            className="w-full flex flex-col items-center">
            <button 
                onClick={() => {setShow(true)}}
                className='w-96 bg-blue-600 h-12 mt-7 mb-3 text-white rounded-lg'
                style={{width:'30rem'}}>
                What is in your mind?
            </button>

            {show && <Modal show={show} setShow={setShow} Component={component}/>}
            <PostsShow />
        </div>
    )
}
