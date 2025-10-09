import { useEffect, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { createPost } from "../../../stores/postsStore"
import propTypes from "prop-types"
import SmallLoadingSpinner from "../../LoadingSpinner/SmallLoadingSpinner"
import ImagesPreview from "./ImagesPreview"
import Modal from "../../Modals/Modal"
import { TextArea } from "../../Form/Inputs"

export default function CreatePostModal({show, setShow}) {
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const [form , setForm] = useState({postContent: '', images: []})
    const {loading} = useSelector(state => state.posts)

    useEffect(() => {
        
    }, [form])

    function handleChange (e) {
        const {name, value, type, files} = e.target        
        if(type == 'file') setForm(prev => ({...prev, [name]: [...prev[name],...files]}))
        else setForm(prev => ({...prev, [name]: value}))
    }

    function createFormData () {
        const formdata = new FormData        
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
            .then(() => {
                setShow(false)
                setForm({postContent: '', images: []})
            })
        }else{
            setError("Post Can't be Empty")
            setTimeout(() => setError(''), 3000)
        }
    }

    function PostInput () {
        const input_data = {
            name: 'postContent',
            placeholder: 'Share Your Thoughts...',
            error: error
        }
        return TextArea(input_data)
    }

    function ImagesInput () {
        return (
            <>
                <label
                    htmlFor="images" 
                    className="bg-blue-800 text-white rounded-md w-28 py-1 hover:cursor-pointer text-center m-2">
                    Add Images +
                </label>
                <input name="images"  type="file" id="images" className="hidden" multiple/>

                {form.images.length > 0 && <ImagesPreview images={form.images} setForm={setForm} />}
            </>
        )
    }

    return (
        <Modal show={show} setShow={setShow} >
            <form 
                onChange={handleChange}
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-[28rem] py-2">
                    
                <button
                    type="submit" 
                    className="bg-blue-800 text-white w-20 p-1 rounded-md self-end mr-2">
                    Post
                </button>

                {PostInput()}                
                {loading && <SmallLoadingSpinner/>}
                {ImagesInput()}
            </form>
        </Modal>
    )
}

CreatePostModal.propTypes = {
    show: propTypes.bool,
    setShow: propTypes.func
}