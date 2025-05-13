import { useEffect, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { createPost } from "../../../stores/postsStore"
import propTypes from "prop-types"
import SmallLoadingSpinner from "../../LoadingSpinner/SmallLoadingSpinner"
import ImagesPreview from "./ImagesPreview"
import Modal from "../../Modal"

export default function CreatePostModal({show, setShow}) {
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const [form , setForm] = useState({postContent: '', images: []})
    const {loading} = useSelector(state => state.posts)

    function handleChange (e) {
        const {name, value, type, files} = e.target
        if(type == 'file') setForm(prev => ({...prev, [name]: [...prev[name],...files]}))
        else setForm(prev => ({...prev, [name]: value}))
    }

    function createFormData () {
        let formdata = new FormData
        formdata.append('content', form.postContent)
        for (let i = 0; i < form.images.length; i++) {
            formdata.append('image'+i, form.images[i])
        }
        return formdata
    }
    
    function handleSubmit (e) { 
        e.preventDefault()        
        if(form.postContent || form.images.length > 0){
            const formdata = createFormData()
            dispatch(createPost(formdata))
            .then(() => setShow(false))
        }else{
            setError("Post Can't be Empty")
            setTimeout(() => setError(''), 3000)
        }
    }

    useEffect(() => {
        document.getElementById('create-post')?.focus()
    }, [])

    return (
        <Modal show={show} setShow={setShow} >
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-96 py-2">
                <button 
                    className="bg-blue-800 text-white w-20 p-1 rounded-md self-end mr-2">
                        Post
                </button>
                <textarea 
                    id="create-post"
                    name="postContent"
                    onChange={handleChange}
                    className="resize-none h-40 focus:outline-none border-none p-2" 
                    placeholder='Share Your Thoughts...'>
                </textarea>
                {loading && <SmallLoadingSpinner/>}
                {error && <p className="text-red-700 m-auto">{error}</p> }
                <label
                    htmlFor="images" 
                    className="bg-blue-800 text-white rounded-md w-28 py-1 hover:cursor-pointer text-center m-2">
                        Add Images +
                </label>
                <input name="images" onChange={handleChange} type="file" id="images" className="hidden" multiple/>
                {form.images.length > 0 && <ImagesPreview images={form.images} setForm={setForm} /> }
            </form>
        </Modal>
    )
}

CreatePostModal.propTypes = {
    show: propTypes.bool,
    setShow: propTypes.func
}