import PostCard from "../Posts/postCard/PostCard"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postsSearch, setSearch } from "../../stores/searchStore"
import useInfinteScroll from "../../useInfinteScroll"
import ShowLoop from "../../components/Common/ShowLoop"
import { useEffect } from "react"

export default function PostsSearchPage() {
    const dispatch = useDispatch()
    const {posts, loading, search} = useSelector(state => state.search)
    const {search: searchKey} = useParams()

    useEffect(() => {
        if (!search) dispatch(setSearch(searchKey))
    },[])

    useInfinteScroll(() => dispatch(postsSearch ()), posts.length == 0)

    return (
        <div className="m-auto w-fit">
            <ShowLoop loading={loading} array={posts} LoopComponent={PostCard} message={'No Results Found'}/>
        </div>
    )
}