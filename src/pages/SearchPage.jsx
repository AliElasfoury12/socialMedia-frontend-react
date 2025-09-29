import { Link, Outlet, useHref, useParams } from "react-router-dom"
import DefaultLayout from "../components/layouts/DefaultLayout"

export default function SearchPage() {
    const { search } = useParams()
    const url = useHref()

    return (
        <DefaultLayout>
            <div 
                className="flex justify-center fixed top-10 left-0 bg-slate-400 w-screen h-fit py-4 z-10">

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

            <div className="w-fit mx-auto mt-20">
                <Outlet/>
            </div>
        </DefaultLayout>
    )
}
