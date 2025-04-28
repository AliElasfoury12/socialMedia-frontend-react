import { useState } from "react"
import Post from "../../../API/Post"
import { addPost } from '../../../../stores/postsStore' 
import { useDispatch } from "react-redux"
import SmallLoadingSpinner from "../../../LoadingSpinner/SmallLoadingSpinner"
import PropTypes from 'prop-types'
import AddImg from "./AddImg"
import CreatePostInput from "./CreatePostInput"
import Modal from "../../../../Modal"

export default function CreatePost() {
    let dispatch = useDispatch()
    let [post,setPost] = useState('')
    let [imgs, setImgs] = useState([])
    let [loading, setLoading] = useState(false)
    let [show, setShow] = useState(false)
    let [error, setError] = useState('')

    let formdata = new FormData
    formdata.append('post', post)

    for (var i = 0; i < imgs.length; i++) {
        formdata.append('img'+i, imgs[i])
    }

    let submit =  () => { 
      
        if(post || imgs != ''){
            console.log(formdata);
            setLoading(true)   
            Post('posts',formdata)
            .then((data) => {
                dispatch(addPost(data.post))
                setPost('')
                setImgs([])
                setShow(false)
            })
        }else{
            setError('Try to Write Some Words and Try Again.')
            setTimeout(() => setError(''), 3000)
        }
    }
 
    return (
        <>
            <div
                className="w-full flex flex-col items-center">
                <button 
                    onClick={() => {setShow(true)}}
                    className='w-96 bg-blue-600 h-12 mt-7 mb-3 text-white rounded-lg'
                    style={{width:'30rem'}}>
                    What is in your mind?
                </button>
            </div>
            {show && 
                <Modal show={show} setShow={setShow}>
                    <div 
                        className="flex flex-col items-center w-fit">
                        <button 
                            onClick={submit}
                            className="self-end bg-blue-800 text-white rounded-md p-1 my-2 w-20 mr-2">
                            Post
                        </button>
                        <CreatePostInput post={post} setPost={setPost} error={error}/>
                        <div>
                            {loading && <SmallLoadingSpinner/>}
                        </div>
                        <AddImg imgs={imgs} setImgs={setImgs} />
                    </div>
                </Modal>
            }
        </>
    )
}

CreatePost.propTypes = {
    setShow: PropTypes.func,
}