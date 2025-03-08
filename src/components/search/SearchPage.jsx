import { Link, Outlet, useHref, useParams } from "react-router-dom"

export default function SearchPage() {
    let { search } = useParams()
    let url = useHref()

  return (
    <div>
        <div 
        className="flex justify-center sticky top-12 bg-slate-500 w-screen h-fit py-4 z-10">

            <Link 
            className=" bg-blue-700 py-2 px-14  rounded-xl mr-5 mt"
            style={{borderBottom:url.includes('posts')? 'solid 3px #fde047' : ''}}

            to={'/search/posts/' + search} >
                Posts
            </Link>

            <Link 
                className=" bg-blue-700 py-2 px-14 rounded-xl "
                style={{borderBottom:url.includes('users') && 'solid 3px #fde047'}}
                to={'/search/users/' + search} >
                Users
            </Link>
            
        </div>

        <Outlet/>
    </div>
  )
}
