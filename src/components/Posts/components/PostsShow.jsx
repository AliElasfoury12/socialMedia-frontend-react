import PostCard from "../../postCard/PostCard"
import { useDispatch, useSelector } from "react-redux"
import { getPosts, setLoading, setPage } from '../../../stores/postsStore' 
import useInfinteScroll from "../../../useInfinteScroll"
import ShowLoop from "../../../ShowLoop"

export default function PostsShow () {
    let dispatch = useDispatch()
    let {posts, loading, end, page, lastPage}  = useSelector(state => state.posts)

    let handleGetPosts = () => {
        if (!end && page > lastPage) {
            dispatch(setLoading(true))
            dispatch(getPosts(page))
        }
    }

    useInfinteScroll(page, setPage, handleGetPosts)

    return (
       <ShowLoop loading={loading} array={posts} LoopComponent={PostCard}/>
    )
}