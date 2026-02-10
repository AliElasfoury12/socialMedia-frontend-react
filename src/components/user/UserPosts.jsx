import  PostCard  from '../Posts/postCard/PostCard'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts } from '../../stores/profile/profile_thunks'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import ShowLoop from '../../components/Common/ShowLoop'

export default function UserPosts() {
    const {userId} = useParams()
    const {loading ,usersPosts} = useSelector(state => state.profile)
    const dispatch = useDispatch()    
    
    useInfiniteScroll(() => dispatch(getUserPosts(userId)), usersPosts[userId] == undefined )
    
    return(
        <div>
            <ShowLoop 
                LoopComponent={PostCard} 
                loading={loading} 
                message={'No posts Yet.'} 
                array={usersPosts[userId]?.posts ?? []} 
            />
        </div>
    )       
}