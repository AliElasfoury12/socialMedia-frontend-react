import PostCard from "../postCard/PostCard"
import { useDispatch, useSelector } from "react-redux"
import { getPosts, setPage } from '../../stores/postsStore' 
import useInfinteScroll from "../../useInfinteScroll"
import ShowLoop from "../../components/ShowLoop"

export default function ShowPosts () {
    const dispatch = useDispatch()
    const {posts, loading, end, page, lastPage} = useSelector(state => state.posts)

    function handleGetPosts () {
        if (!end && page > lastPage) dispatch(getPosts(page))
    }

    useInfinteScroll(page, setPage, handleGetPosts)
    
    return (
        <ShowLoop loading={loading} array={posts} LoopComponent={PostCard}/>
    )
}