import PostCard from "./postCard/PostCard"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from '../../stores/postsStore' 
import useInfinteScroll from "../../useInfinteScroll"
import ShowLoop from "../../components/ShowLoop"

export default function ShowPosts () {
    const dispatch = useDispatch()
    const {posts, loading} = useSelector(state => state.posts)

    useInfinteScroll(() => dispatch(getPosts()), posts.length == 0)
    
    return (
       <div className="m-auto">
            <ShowLoop loading={loading} array={posts} LoopComponent={PostCard}/>
       </div>
    )
}