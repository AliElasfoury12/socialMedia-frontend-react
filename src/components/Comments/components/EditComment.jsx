import arrow from '../../../assets/right-arrow.png'
import {  useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { updateComment } from '../../../stores/commentStore'

export default  function EditComment({ comment }) {
   const dispatch = useDispatch()
   const [content, setContent] = useState(comment.content)

    function createFormData () {
        // const formdata = new FormData
        // formdata.append('_method','PUT');
        // formdata.append('content', content)
        // return formdata
        return {_method: "PUT", content:content}
    }

    function edit (e) {
        e.preventDefault()
        dispatch(updateComment({commentId: comment.id, formData: createFormData()}))
    }
    
    return (
        <form 
            className='relative w-full'
            onSubmit={edit} >
            <textarea 
                value={content}
                onChange={(e) => {setContent(e.target.value)}} 
                className='rounded-md my-2 w-[26rem] px-2 resize-none'>
            </textarea>

            <button type='submit'>
                {content.trim() != '' &&       
                    <img className='w-4 h-4 absolute bottom-3 -right-3' src={arrow} />
                }
            </button>
        </form> 
    )
}

EditComment.propTypes = {
   comment: PropTypes.object,
 }