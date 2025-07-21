import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { handelSearch, setLoading, setPage } from "../../stores/searchStore"
import UserCard from "./UserCard"
import useInfinteScroll from "../../useInfinteScroll"
import ShowLoop from "../../components/Common/ShowLoop"

export default function UsersSearchPage() {
    let dispatch = useDispatch()
    let {search} = useParams()
    let {users, loading, page, end, lastPage} = useSelector(state => state.search)

    let searchUsers = () => {
        if((!end && page > lastPage)) {
            dispatch(setLoading(true))
            dispatch(handelSearch({search, page}))
        } 
    }

    useInfinteScroll(page, setPage, searchUsers)

    return (
        <ShowLoop loading={loading} array={users} LoopComponent={UserCard} message={'No Results Found'}/>
    )
}