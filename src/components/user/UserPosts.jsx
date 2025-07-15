import  PostCard  from '../Posts/postCard/PostCard'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userPosts, setLoading, setPage} from '../../stores/profileStore'
import useInfinteScroll from '../../useInfinteScroll'
import ShowLoop from '../../components/ShowLoop'

export default function UserPosts() {
    let dispatch = useDispatch()
    let {id} = useParams()
    let { page, loading, userData} = useSelector(state => state.profile)

    let currentPage = userData != '' ? userData.page : 0
    let lastPage = userData != '' ? userData.lastPage : 2
    let end =  userData != '' ? userData.end : false
    let user_posts = userData != '' ? userData.posts : []

    console.log(userData);
    

    let GetUserPosts = () => {
        if(!end && page <= lastPage && page > currentPage) {
            dispatch(setLoading(true))
            dispatch(userPosts({id,page}))
        }
    }
 
    useInfinteScroll(page, setPage, GetUserPosts)
    
    return(
        <ShowLoop LoopComponent={PostCard} loading={loading} message={'No posts Yet.'} array={user_posts} />
    )       
}


