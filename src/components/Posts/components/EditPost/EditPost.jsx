import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Put from "../../../API/Put"
import { useDispatch } from 'react-redux'
import { setShowEditModal , editPost } from '../../../../stores/postsStore' 
import Get from '../../../API/Get'
import BigLoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import EditPostHeader from './EditPostHeader'
import EditPostFooter from './EditPostFooter'

export default function EditPost({ post }) {
    let dispatch = useDispatch()

    let [postVal, setPostVal] = useState(post.post)
    let [postError, setPostErorr] = useState()
    let [loading, setLoading] = useState(true)
    let [imgs, setImgs] = useState([])

    let formdata = new FormData
    formdata.append('post', postVal)

    for (let i = 0; i < imgs.length; i++) {
        formdata.append('img'+i, imgs[i])
    }

    let edit = () => {
        Put('posts/' + post.id, formdata)
        .then((data) => {
            dispatch(setShowEditModal(false))
            dispatch(editPost(data.post))
        }).catch((error) => {
            error?.post && setPostErorr(error.post[0])
        })
     }

     let  getPost = () => {
        Get('posts/'+ post.id)
        .then((data)=> {
           setPostVal(data)
            setLoading(false)
        })
    }
    useEffect(() => {
        if(post.post.length >= 80){
            setLoading(false)
            getPost()
        }else{
            setLoading(false)
        }
    },[])

    if(loading){
        return(
            <div 
                style={{width: '28rem', height: '15rem'}}> 
                <BigLoadingSpinner/>
            </div> 
        )
    }

    return (
        <div
            className="flex flex-col p-2 m-auto"
            style={{width:'28rem'}}>
            <EditPostHeader post={post} edit={edit}/>
            <EditPostFooter
            post={post} postVal={postVal} setPostVal={setPostVal} 
            postError={postError} imgs={imgs} setImgs={setImgs} />
       </div>
    )
}

EditPost.propTypes = {
    post: PropTypes.object,
}