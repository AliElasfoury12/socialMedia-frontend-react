import { Search  as SearchIcon} from "lucide-react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { handelSearch, resetPage, setEnd, setSearch } from "../../stores/searchStore"
import { useEffect, useState } from "react"
import UsersSearchPage from "./UsersSearchPage"

export default function SearchBar() {
    let dispatch = useDispatch()
    let {search} = useSelector(state => state.search)
    let [on, setOn] = useState(false)

    window.onclick = (e) => {        
        let searchElement = document.getElementById('searchVal')
        e.target != searchElement && setOn(false)
    }

    let Search = () => {
        if(search ){
            dispatch(handelSearch({search: search, page: 1}))
            dispatch(setEnd(false))
            dispatch(resetPage())
            setOn(true)
        }
    }

    useEffect (() => {      
        let typing = setTimeout(() => Search(), 1700)
        return () => clearTimeout(typing)
    },[search])
  
    return (
        <div 
            className="w-fit m-auto relative ">
           <div
                className="w-fit m-auto">
                <input
                    onChange={(e)=> {dispatch(setSearch(e.target.value))}}
                    id="searchVal"
                    className="w-80 rounded-lg resize-none px-3 py-1  placeholder:text-lg text-black"
                    placeholder="...search"/>

                {search &&
                    <Link 
                        to={'/search/users/' + search} 
                        className="absolute right-1 z-20"
                        style={{top: '2px'}}>
                        <SearchIcon className="text-blue-950 h-7 w-7"/>
                    </Link>
                }
           </div>

           {on && 
                <div    
                    className='p-2 bg-blue-600 rounded-xl absolute flex justify-center -left-24 -top-10 scale-75'
                    style={{height: '41rem', width: '32rem'}}>
                    <UsersSearchPage/>
                </div>
           }
        </div> 
    )
}