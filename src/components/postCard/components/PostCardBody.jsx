import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { postsStorage } from '../../../stores/statices'
import Modal from '../../Modal'
import api from '../../API/APIMethods'

export default function PostCardBody({ post }) {
    const [Post, setPost] = useState(post.post ?? '')
    let images = post.post_imgs ?? []
    const [show, setShow] = useState(false)
    let storage = postsStorage

    function getPost ()
    {
        api.GET('posts/'+ post.id)
        .then((data)=> {
            setPost(data)
        })
    }

    useEffect(() =>{setPost(post.post)},[post])

    let component = () => {
        let showImages = images.map((img,index) => {
            return (
                <img 
                    loading='lazy'
                    key={index}
                    className=" mb-4 " 
                    style={{width: '40rem'}}
                    src={storage + img.img} />
            )
        })

        return (
            <div
                className=" flex flex-col rounded-xl 
                my-3 py-1 px-2 min-w-80 m-auto gap-2 overflow-y-scroll"
                style={{width: '40rem'}}>
                {showImages}
            </div>
        )
    }

    return (
        <div>
              <div 
                    onClick={() => {
                       if(Post.length >= 83){
                            setPost(Post.substr(0,80)+ '...')
                       }
                    }}
                    className="w-96 text-left text-lg my-3 mx-2 select-text">
                    {Post}

                    { Post.length == 83 && 
                        <button onClick={getPost} className='text-sm text-blue-700 '>
                            show more
                        </button>
                    }
                </div>

                <div className=' w-fit m-auto'>
                { images.length == 1 ?
                    <img 
                        className=" mb-4" 
                        style={{width:'29.8rem', maxHeight:'30rem'}}
                        src={storage + images[0]?.img} /> :

                  <div>
                    {images != '' &&
                        <div className='flex '>
                            <img 
                                onClick={() => {setShow(true)}}
                                className=" mb-4 h-80 w-60" 
                                src={storage + images[0]?.img} /> 

                            <div 
                                onClick={() => {setShow(true)}}
                                className='bg-gray-500 h-80 flex items-center justify-center 
                                text-xl text-white w-60'>
                                {'+' + (images.length -1) }
                            </div>
                        </div>
                    } 
                  </div>
                }
                </div>

                {show && <Modal show={show} setShow={setShow} Component={component} />}
        
        </div>
    )
}

PostCardBody.propTypes = {
    post: PropTypes.object
}