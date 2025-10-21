import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { usersSearch } from "../../stores/search/search_thunks"
import UserCard from "./UserCard"
import useInfinteScroll from "../../hooks/useInfinteScroll"
import ShowLoop from "../../components/Common/ShowLoop"
import { useEffect, useRef } from "react"

export default function UsersSearchPage() {
    const dispatch = useDispatch()
    const {search} = useParams()
    const {users, loading } = useSelector(state => state.search)
    const isFirstMount = useRef(true)

    function handleSearch () {        
        if(isFirstMount.current && users.length > 0) return
        dispatch(usersSearch(search))
    }

    useEffect(() => {
        isFirstMount.current = false
    },[])

    useInfinteScroll(handleSearch, users.length == 0)

    return (
        <ShowLoop 
            loading={loading} 
            array={users} 
            LoopComponent={UserCard} 
            message={'No Results Found'}
        />
    )
}