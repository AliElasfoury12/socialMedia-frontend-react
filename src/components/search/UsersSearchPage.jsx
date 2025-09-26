import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setSearch, usersSearch } from "../../stores/searchStore"
import UserCard from "./UserCard"
import useInfinteScroll from "../../useInfinteScroll"
import ShowLoop from "../../components/Common/ShowLoop"
import { useEffect } from "react"

export default function UsersSearchPage() {
    const dispatch = useDispatch()
    const {search: searchKey} = useParams()
    const {users, loading, search } = useSelector(state => state.search)

    useEffect(() => {
       if (!search) dispatch(setSearch(searchKey))
    },[])

    useInfinteScroll(() => dispatch(usersSearch()), users.length == 0 )

    return (
        <div className="w-fit mx-auto">
            <ShowLoop 
                loading={loading} 
                array={users} 
                LoopComponent={UserCard} 
                message={'No Results Found'}
            />
        </div>
    )
}