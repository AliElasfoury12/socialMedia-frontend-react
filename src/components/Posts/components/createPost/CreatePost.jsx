import { useState } from "react"
import { useDispatch} from "react-redux"
import { emptyObject } from "../../../../utils/objects"
import CreatePostModal from "./CreatePostModal"
import { createPost, setShowCreatePostModal } from "../../../../stores/postsStore"

export default function CreatePost() {
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const [form, setForm] = useState({postContent: '', images: {}})

    function handleSubmit (e) 
    { 
        e.preventDefault()        
        if(form.postContent || !emptyObject(form.images)){
            const formdata = createFormData()
            dispatch(createPost(formdata))
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

    return (
        <>
            <button 
                className='w-96 bg-blue-600 h-12 mt-7 mb-3 text-white rounded-lg'
                onClick={() => {dispatch(setShowCreatePostModal(true))}}
                style={{width:'30rem'}}>
                What is in your mind?
            </button>
            <CreatePostModal 
                error={error} 
                form={form}
                setForm={setForm}
                handleSubmit={handleSubmit} 
            />
        </>
    )
}