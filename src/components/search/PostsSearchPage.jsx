import PostCard from "../Posts/postCard/PostCard"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, handelPostsSearch, setPostsPage } from "../../stores/searchStore"
import useInfinteScroll from "../../useInfinteScroll"
import ShowLoop from "../../components/ShowLoop"

export default function PostsSearchPage() {
    let dispatch = useDispatch()
    let {posts, loading, postsPage, postsEnd} = useSelector(state => state.search)
    let {search} = useParams()

    let searchPosts =  () => {
        if((!postsEnd && postsPage > 1) || (postsPage == 1 && posts == '')) {
            dispatch(setLoading(true))
            dispatch(handelPostsSearch ({search, postsPage}))
        } 
    }
         
    useInfinteScroll(postsPage, setPostsPage, searchPosts)

    return (
        <div className="m-auto w-fit">
            <ShowLoop loading={loading} array={posts} LoopComponent={PostCard} message={'No Results Found'}/>
        </div>
    )
}