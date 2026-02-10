import CommentsCard from './CommentsCard/CommentsCard'
import useInfiniteScroll from '../../../hooks/useInfiniteScroll'
import ShowLoop from '../../Common/ShowLoop'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from '../../../stores/comments/comments_thunks'
import PropTypes from 'prop-types'
import { useState } from 'react'

export default function ShowComments({post}) {
    const dispatch = useDispatch()
	const { comments } = useSelector(state => state.comments)
    const [ loading, setLoading ] = useState(false)
  
    function get_comments () {
        setLoading(true)
        dispatch(getComments(post))
        .then(() => {
            setLoading(false)
        })
    }

    useInfiniteScroll(get_comments , comments[post.id] == undefined, 'comments-show-div')
  
    return (
        <div 
            id='comments-show-div'
            className='max-h-60 overflow-auto min-h-3 px-2 w-[27rem]'> 
            <ShowLoop loading={loading} array={comments[post.id]?.data ?? [] } LoopComponent={CommentsCard} message={'No Comments Yet.'}/>
        </div>
    )
}

ShowComments.propTypes = {
	post: PropTypes.object
}