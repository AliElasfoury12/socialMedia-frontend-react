import PostCard from "../../postCard/PostCard"
import { useDispatch, useSelector } from "react-redux"
import { getPosts, setPage } from '../../../stores/postsStore' 
import useInfinteScroll from "../../../useInfinteScroll"
import ShowLoop from "../../../ShowLoop"

export default function ShowPosts () {
    let dispatch = useDispatch()
    let {posts, loading, end, page, lastPage}  = useSelector(state => state.posts)

    let handleGetPosts = () => {
        if (!end && page > lastPage){ dispatch(getPosts(page))}
    }

    useInfinteScroll(page, setPage, handleGetPosts)
    
    return (
        <ShowLoop loading={loading} array={posts} LoopComponent={PostCard}/>
    )
}