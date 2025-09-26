import { Search  as SearchIcon} from "lucide-react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { usersSearch, setSearch, setShow } from "../../stores/searchStore"
import { useEffect, useRef } from "react"
import UsersSearchPage from "./UsersSearchPage"

export default function SearchBar() {
    const dispatch = useDispatch()
    const {search, show} = useSelector(state => state.search)
    const firstRender = useRef(true)

    window.onclick = (e) => {        
        const searchElement = document.getElementById('searchVal')
        e.target != searchElement && dispatch(setShow(false))
    }

    function handleSearch () {
        dispatch(usersSearch())
        if(!show) dispatch(setShow(true))
    }
    
    useEffect (() => { 
        if(firstRender.current){
            firstRender.current = false
            if(show) dispatch(setShow(false))
            return
        }
             
        const typing = setTimeout(() => handleSearch() , 500)
        return () => clearTimeout(typing)
    },[search])

    
    return (
        <div 
            className="w-fit m-auto relative ">
           <div
                className="w-fit m-auto">
                <input
                    onChange={(e) => {dispatch(setSearch(e.target.value))}}
                    id="searchVal"
                    className="w-80 rounded-lg resize-none px-3 py-1  placeholder:text-lg text-black"
                    placeholder="...search"/>

                {search &&
                    <Link 
                        to={'/search/users/' + search} 
                        className="absolute right-1 z-20 top-[2px]">
                        <SearchIcon className="text-blue-950 h-7 w-7"/>
                    </Link>
                }
           </div>

           {show && 
                <div    
                    className='p-2 bg-white rounded-xl absolute flex justify-center -left-24 -top-7 scale-75 h-[40rem] w-[32rem] overflow-scroll'>
                    <UsersSearchPage/>
                </div>
           }
        </div> 
    )
}