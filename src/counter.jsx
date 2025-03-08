import { useDispatch, useSelector } from "react-redux"
import {   getPosts } from './stores/postsStore' 
import { useEffect, useState } from "react"
import {  Try, trySunc } from "./stores/countrStore"
import BigLoadingSpinner from "./LoadingSpinner/LoadingSpinner"
import Get from "./components/API/Get"
import { Car } from "../MyComponent"
import { data } from "autoprefixer"


function Counter () {
    let [show, setShow] = useState(true)

  useEffect(() => {
    Get('http://127.0.0.1:5500/react-api/src/data.json')
    .then((data) => {
        console.log(data);
    })
  },[])

    /*
    const dispatch = useDispatch()
    dispatch(trySunc())
    Get('test')
    return(<div>
    </div> )
    /*
    const {posts}  = useSelector(state => state.posts)
    let {authUser} = useSelector(state => state.auth)

   

    let [page, setPage] = useState(1)

    let handelScroll = () => {
        let doc = document.documentElement
        if(window.innerHeight + doc.scrollTop +1 >= doc.scrollHeight ){
            setPage(p => p + 1)
       }
    }


    useEffect(() => {
        window.addEventListener('scroll', handelScroll)

        return () => window.removeEventListener('scroll', handelScroll)
    },[])

    useEffect(() => {
        dispatch(Try( {name:'ali',id:5} ))

        dispatch(resetPosts())}, [])


    useEffect(() => {dispatch(getPosts(page))},[page])

    let showPosts = posts?.map((post) => {
        return (
            
        <PostCard key={post.id} post={post} />
    )
    })
    let str = 'post 1post 1post 1post 1post 1post 1post...'
    console.log(str.length);

    useEffect(() => {
        window.Echo.private(`testchannel.user.${authUser.id}`)
        .listen('testingEvent', (event) => {
           console.log(event)
        })
     },[])
  
     useEffect(() => {
        window.Echo.private(`privateTestchannel`)
        .listen('PrivateEvent', (event) => {
           console.log(event)
        })
     },[])
  
     useEffect(() => {
        window.Echo.channel('Post')
        .listen('PostEvent', (e) => {
           console.log(e)
        })
     },[])

    return (
        <div>
            <div className="m-auto" ><BigLoadingSpinner/></div>

            {showPosts}
        </div>
    )
        */

    //return(<Car/>)
}

export default Counter






