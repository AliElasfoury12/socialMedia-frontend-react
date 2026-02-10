import PostCard from "../Posts/postCard/PostCard"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postsSearch } from "../../stores/search/search_thunks"
import useInfiniteScroll from "../../hooks/useInfiniteScroll"
import ShowLoop from "../../components/Common/ShowLoop"
import { useEffect, useRef } from "react"

export default function PostsSearchPage() {
    const dispatch = useDispatch()
    const {posts, loading } = useSelector(state => state.search)
    const {search} = useParams()
    const isFirstMount = useRef(true)

    function handleSearch () {        
        if(isFirstMount.current && posts.length > 0) return
        dispatch(postsSearch (search))    
    }

    useEffect(() => {
        isFirstMount.current = false
    },[])

    useInfiniteScroll(handleSearch, posts.length == 0)

    return (
        <ShowLoop loading={loading} array={posts} LoopComponent={PostCard} message={'No Results Found'}/>
    )
}