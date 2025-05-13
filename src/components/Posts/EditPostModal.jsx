import Modal from "../Modal";
import propTypes from "prop-types"
import ImagesPreview from "./createPost/ImagesPreview";
import { useEffect, useState } from "react";
import SmallLoadingSpinner from "../LoadingSpinner/SmallLoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../stores/postsStore";
import api from "../API/APIMethods";

export default function EditPostModal({ post, show, setShow }) {
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.posts)
    const [images , setImages] = useState([...post.post_imgs])
    const [form , setForm] = useState({postContent: post.content, images: images})
    const [error, setError] = useState('')
    const [toDeleteImages, setToDeleteImages] = useState([])

    function handleChange (e) {
        const {name, value, type, files} = e.target
        if(type == 'file') setForm(prev => ({...prev, [name]: [...prev[name],...files]}))
        else setForm(prev => ({...prev, [name]: value}))
    }

    function createFormData () {
        let formdata = new FormData
        formdata.append('_method','PUT');
        formdata.append('content', form.postContent)
        for (let i = 0; i < form.images.length; i++) {
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
                setShow(false)
                api.DELETE(`delete-images/${post.id}`, {images: toDeleteImages})
            })  
        }else{
            setError("Post Can't be Empty")
            setTimeout(() => setError(''), 3000)
        }
    }

    useEffect(() => {
        document.getElementById('edit-post')?.focus()
    }, [])

    return (
        <Modal show={show} setShow={setShow} >
             <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-96 py-2">
                <button 
                    className="bg-blue-800 text-white w-20 p-1 rounded-md self-end mr-2">
                        Update
                </button>
                <textarea 
                    id="edit-post"
                    name="postContent"
                    onChange={handleChange}
                    className="resize-none h-40 focus:outline-none border-none p-2" >
                        {post.content}
                </textarea>
                 {loading && <SmallLoadingSpinner/>}
                {error && <p className="text-red-700 m-auto">{error}</p> } 
                <label
                    htmlFor="images" 
                    className="bg-blue-800 text-white rounded-md w-28 py-1 hover:cursor-pointer text-center m-2">
                        Add Images +
                </label>
                <input name="images" 
                onChange={handleChange} 
                type="file" id="images" className="hidden" multiple/>
                <ImagesPreview 
                    images={images}
                    setImages={setImages} 
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
