import shareIcon from '../../../../assets/right-arrow.png'
import Post from '../../../API/Post'
import Modal from '../../../Modal'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { postsStorage, profileStorage } from '../../../../stores/statices'

export default function SharePost(props) {
    let { post } = props
    let [show, setShow] = useState(false)
 
    let Component = () => {
        let [postVal, setPostVal] = useState('')

        let sharePost = () => {
            Post('share-post', {post: postVal, shared_post_id: post.id})
            .then(() => {
                setShow(false)
            })
        }

        useEffect(() => {
            document.getElementById('post').focus()
        }, [])

        return (
            <div 
                className='flex flex-col p-2 items-center'
                style={{width: '28rem'}}>

                <button  
                    onClick={sharePost}   
                    className='bg-blue-600 rounded py-1 w-24 self-end'>
                    Share
                </button>
                <textarea
                    id='post' 
                    onChange={(e) => {setPostVal(e.target.value)}}
                    className='resize-none p-2 my-2 focus:outline-none border-black border border-x-0 h-40' 
                    style={{width: '28rem'}}
                    placeholder='Writte Somthing'
                    type="text" >
                </textarea>

               <div 
                    className='flex gap-2 self-start items-center'>
                    <img 
                        src={post.post_imgs != '' ? 
                        postsStorage + post.post_imgs[0].img :
                        profileStorage + post.user.img}
                        className='w-14 h-12' />
                    <p>{post.post}</p>
                </div>

            </div>
        )
    }

    return (
        <div>

            <div
                onClick={() =>  setShow(true) }
                className='flex bg-blue-500 w-28 justify-center items-center h-7 rounded-full py-4'>
                <img className='w-4 mr-2' src={shareIcon}/>
                <button>Share</button>
            </div>

            {show && <Modal show={show} setShow={setShow} Component={Component} />}
        </div>
    )
}

SharePost.propTypes = {
	post: PropTypes.object
}