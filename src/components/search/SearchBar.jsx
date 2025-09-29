import { Search  as SearchIcon} from "lucide-react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setShow, searchBar } from "../../stores/searchStore"
import { useEffect, useState } from "react"
import UsersSearchPage from "./UsersSearchPage"

export default function SearchBar() {
    const dispatch = useDispatch()
    const {show} = useSelector(state => state.search)
    const [search, setSearch] = useState('')

    window.onclick = (e) => {        
        const searchElement = document.getElementById('searchVal')
        e.target != searchElement && dispatch(setShow(false))
    }
 
    useEffect (() => {  
        const typing = setTimeout(() => dispatch(searchBar(search)) , 500)
        return () => clearTimeout(typing)
    },[search])

    
    return (
        <div 
            className="w-fit m-auto relative ">
           <div
                className="w-fit m-auto">
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    id="searchVal"
                    className="w-80 rounded-lg resize-none px-3 py-1  placeholder:text-lg text-black"
                    placeholder="...search"/>

                {search &&
                    <Link 
                        to={`/search/users/${search}`} 
                        className="absolute right-1 z-20 top-[2px]">
                        <SearchIcon className="text-blue-950 h-7 w-7"/>
                    </Link>
                }
           </div>

           {show && 
                <div    
                    className='p-2 bg-white rounded-xl absolute flex justify-center -left-24 -top-9 scale-75 h-[40rem] w-[32rem] overflow-scroll'>
                    <UsersSearchPage/>
                </div>
           }
        </div> 
    )
}