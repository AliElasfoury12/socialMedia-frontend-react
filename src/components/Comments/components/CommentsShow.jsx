import CommentsCard from './CommentsCard'
import useInfinteScroll from '../../../useInfinteScroll'
import ShowLoop from '../../../components/ShowLoop'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from '../../../stores/commentStore'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

export default function CommentsShow({post}) {
    const dispatch = useDispatch()
	const { loading, comments } = useSelector(state => state.comments)
  
	useInfinteScroll(() => dispatch(getComments({post})),'comments')

    useEffect(() => {
        console.log(comments);
    },[comments])
    
    return (
        <div 
            id='comments'
            className='max-h-60 overflow-auto mt-3 min-h-3 px-2 w-[27rem]'> 
            <ShowLoop loading={loading} array={comments[post.id]?.data ?? [] } LoopComponent={CommentsCard} message={'No Comments Yet.'}/>
        </div>
    )
}

CommentsShow.propTypes = {
	post: PropTypes.object
}