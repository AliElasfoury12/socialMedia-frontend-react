import CommentsCard from './CommentsCard/CommentsCard'
import useInfinteScroll from '../../../useInfinteScroll'
import ShowLoop from '../../../components/Common/ShowLoop'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from '../../../stores/commentStore'
import PropTypes from 'prop-types'

export default function CommentsShow({post}) {
    const dispatch = useDispatch()
	const { loading, comments } = useSelector(state => state.comments)
  
    useInfinteScroll(() => dispatch(getComments(post)), comments[post.id] == undefined, 'comments-show-div')
  
    return (
        <div 
            id='comments-show-div'
            className='max-h-60 overflow-auto min-h-3 px-2 w-[27rem]'> 
            <ShowLoop loading={loading} array={comments[post.id]?.data ?? [] } LoopComponent={CommentsCard} message={'No Comments Yet.'}/>
        </div>
    )
}

CommentsShow.propTypes = {
	post: PropTypes.object
}