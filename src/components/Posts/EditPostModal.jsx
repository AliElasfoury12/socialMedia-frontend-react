import Modal from "../Modals/Modal";
import propTypes from "prop-types"
import ImagesPreview from "./createPost/ImagesPreview";
import { useEffect, useState } from "react";
import SmallLoadingSpinner from "../LoadingSpinner/SmallLoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { deletePostImages, updatePost } from "../../stores/postsStore";
import { emptyObject } from '../../utils/objects'
import { TextArea } from "../Form/Inputs";

export default function EditPostModal({ post, show, setShow }) {
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.posts)
    const [form , setForm] = useState({postContent: post.content, images: [...post.post_imgs]})
    const [error, setError] = useState('')
    const [toDeleteImages, setToDeleteImages] = useState([])

    function handleChange (e) {
        const {name, value, type, files} = e.target
        if(type == 'file') {
            setForm(prev => ({...prev, [name]: [...prev[name],...files]}))
        }else setForm(prev => ({...prev, [name]: value}))
    }

    function createFormData () {
        let formdata = new FormData
        formdata.append('_method','PUT');
        formdata.append('content', form.postContent)
        for (let i = 0; i < form.images.length; i++) {
            if(form.images[i].img) continue
            formdata.append('image'+i, form.images[i])
        }
        return formdata
    }

    function handleSubmit(e) {
        e.preventDefault()        
        if(form.postContent || form.images.length > 0){
            const formdata = createFormData()
            dispatch(updatePost({postId: post.id, formdata}))
            .then(() => {
                if(toDeleteImages.length) dispatch(deletePostImages({postId: post.id, toDeleteImages}))
                setShow(false)
            })  
        }else{
            setError("Post Can't be Empty")
            setTimeout(() => setError(''), 3000)
        }
    }

    useEffect(() => {        
        setForm(f => ({...f, postContent: post.content, images: post.post_imgs}))
    },[show])

   function PostInput () {
        const input_data = {
            name: 'postContent',
            defaultValue: post.content,
            placeholder: 'Share Your Thoughts...',
            error: error
        }
        return TextArea(input_data)
    }

    function ImagesInput () {
        return (
            <>
                {( post.shared_post == undefined || emptyObject(post.shared_post)) && 
                <label
                    htmlFor="images" 
                    className="bg-blue-800 text-white rounded-md w-28 py-1 hover:cursor-pointer text-center m-2">
                    Add Images +
                </label>
                }
                <input 
                    name="images" 
                    type="file" id="images" className="hidden" multiple accept="image/*"/>
            </>
        )
    }

    return (
        <Modal show={show} setShow={setShow} >
            <form 
                onChange={handleChange}
                onSubmit={handleSubmit}
                className="form w-96 py-2">
                <button 
                    type="submit"
                    className="bg-blue-800 text-white w-20 p-1 rounded-md self-end mr-2">
                    Update
                </button>

                {PostInput()}

                {loading && <SmallLoadingSpinner/>}

                {ImagesInput()}

                <ImagesPreview 
                    images={form.images}
                    setForm={setForm}
                    setToDeletedImages={setToDeleteImages}/>
            </form>
        </Modal>
    )
}

EditPostModal.propTypes = {
    post: propTypes.object,
    show: propTypes.bool,
    setShow: propTypes.func
}

