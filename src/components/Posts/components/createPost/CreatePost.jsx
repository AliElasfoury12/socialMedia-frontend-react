import { useState } from "react"
import { useDispatch} from "react-redux"
import { emptyObject } from "../../../../utils/objects"
import CreatePostModal from "./CreatePostModal"
import { createPost } from "../../../../stores/postsStore"
import PropTypes from 'prop-types'

export default function CreatePost({show, setShow}) {
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const [form, setForm] = useState({postContent: '', images: []})

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
        <CreatePostModal 
            show={show}
            setShow={setShow}
            error={error} 
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit} 
        />
    )
}

CreatePost.propTypes = {
    show: PropTypes.bool,
    setShow: PropTypes.func
}