import SmallLoadingSpinner from "../../../LoadingSpinner/SmallLoadingSpinner"
import ImagesPreview from "./ImagesPreview"
import Modal from "../../../Modal"
import PropTypes from 'prop-types'
import { emptyObject } from "../../../../utils/objects"
import { useEffect } from "react"
import {  setShowCreatePostModal as setShow} from "../../../../stores/postsStore"
import { useDispatch, useSelector } from "react-redux"


export default function CreatePostModal(props) {
    const dispatch = useDispatch()
    const {form, setForm, handleSubmit, error} = props
    const {showCreatePostModal: show, loading} = useSelector( state => state.posts)

    function handleChange (e) {
        const {name, value, type, files} = e.target
        if(type == 'file') setForm(prev => ({...prev, [name]: files}))
        else setForm(prev => ({...prev, [name]: value}))
    }

    useEffect(() => {
        document.getElementById('create-post')?.focus()
    }, [show])

    return (
        <Modal show={show} setShow={(state) => dispatch(setShow(state))} >
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
                {!emptyObject(form.images) && <ImagesPreview images={form.images} setForm={setForm} /> }
            </form>
        </Modal>
    )
}

CreatePostModal.propTypes = {
    form: PropTypes.object,
    setForm: PropTypes.func,
    handleSubmit: PropTypes.func,
    error: PropTypes.string,
}