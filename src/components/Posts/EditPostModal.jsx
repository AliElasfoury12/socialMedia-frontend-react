import Modal from "../Modals/Modal";
import propTypes from "prop-types"
import ImagesPreview from "./createPost/ImagesPreview";
import { useEffect, useState } from "react";
import SmallLoadingSpinner from "../LoadingSpinner/SmallLoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../stores/posts/posts_thunks";
import { emptyObject } from '../../utils/objects'
import { TextArea } from "../Form/Inputs";
import { Alert } from "../../stores/app";

export default function EditPostModal({ post, show, setShow }) {    
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.posts)
    const [form , setForm] = useState({images: [], to_delete_images: []})
    const [error, setError] = useState('')
    const [images, setImages] = useState([...post.post_imgs,...form.images])

    useEffect(() => {
        setForm({images: [], to_delete_images: []})
        setImages([...post.post_imgs,...form.images])
    },[show])

    function handleChange (e) {
        const {name, value, type, files} = e.target
        if(type == 'file') {
            setForm(prev => ({...prev, [name]: [...prev[name],...files]}))
            setImages(prev => [...prev, ...files])
        }else setForm(prev => ({...prev, [name]: value}))
    }

    function createFormData () {
        let formdata = new FormData
        formdata.append('_method','PUT');
        if(form.postContent) formdata.append('content', form.postContent)
        if(form.images){
            for (let i = 0; i < form.images.length; i++) {            
                formdata.append('image'+i, form.images[i])
            }
        }
        if(form.to_delete_images.length > 0){
            formdata.append('to_delete_images', JSON.stringify(form.to_delete_images))
        }
        return formdata
    }

    async function handleSubmit(e) {
        e.preventDefault() 
        const is_post_not_empty = form.postContent || form.images.length > 0     
        if(is_post_not_empty || form.to_delete_images.length > 0){
            const formdata = createFormData()
            await dispatch(updatePost({postId: post.id, formdata}))
            setShow(false)
            dispatch(Alert('post updated successfully'))
        }else{
            setError("Post Can't be Empty")
            setTimeout(() => setError(''), 3000)
        }
    }

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
        <>
            <Modal show={show} setShow={setShow} >
                <form 
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    className="form w-[28rem] py-2">
                    <button 
                        type="submit"
                        className="bg-blue-800 text-white w-20 p-1 rounded-md self-end mr-2">
                        Update
                    </button>

                    {PostInput()}
                    {loading && <SmallLoadingSpinner/>}
                    {ImagesInput()}

                    <ImagesPreview 
                        images={images}
                        setImages={setImages}
                        setForm={setForm}
                    />
                </form>
            </Modal>
        </>
    )
}

EditPostModal.propTypes = {
    post: propTypes.object,
    show: propTypes.bool,
    setShow: propTypes.func
}

