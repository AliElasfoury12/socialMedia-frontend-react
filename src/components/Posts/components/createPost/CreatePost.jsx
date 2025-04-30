import { useState } from "react"
import { addPost } from '../../../../stores/postsStore' 
import { useDispatch} from "react-redux"
import api from "../../../API/APIMethods"
import { emptyObject } from "../../../../utils/objects"
import CreatePostModal from "./CreatePostModal"

export default function CreatePost() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [error, setError] = useState('')
    const [form, setForm] = useState({postContent: '', images: {}})

    function handleSubmit (e) 
    { 
        e.preventDefault()        
        if(form.postContent || !emptyObject(form.images)){
            const formdata = createFormData()
            setLoading(true) 
            createPostRequest(formdata)
        }else{
            setError("Post Can't be Empty")
            setTimeout(() => setError(''), 3000)
        }
    }

    function createFormData ()
    {
        let formdata = new FormData
        formdata.append('content', form.postContent)
        for (let i = 0; i < form.images.length; i++) {
            formdata.append('image'+i, form.images[i])
        }
        return formdata
    }

    function createPostRequest (formdata)
    {
        api.POST('posts',formdata)
        .then((data) => {
            dispatch(addPost(data.post))
            setShow(false)
        })
    }
 
    return (
        <>
            <button 
                className='w-96 bg-blue-600 h-12 mt-7 mb-3 text-white rounded-lg'
                onClick={() => {setShow(true)}}
                style={{width:'30rem'}}>
                What is in your mind?
            </button>
            <CreatePostModal 
                loading={loading} 
                error={error} 
                form={form}
                setForm={setForm}
                show={show}
                setShow={setShow} 
                handleSubmit={handleSubmit} 
            />
        </>
    )
}