import { useDispatch, useSelector } from "react-redux"
import router from "../../Router"
import Header from "./Header"
import PropTypes from 'prop-types'
import { isObject } from "../../utils/objects"
import { useEffect } from "react"
import { GetNewAccessToken } from "../../stores/auth/auth_thunks"

export default function GuestLayout ({children}) {
    const { token, loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {        
        if(token) {
            router.navigate('/')
        }else{
            dispatch(GetNewAccessToken())
        }
    },[])

    if(loading) return <h1>Loading...</h1>
    
    return (
       <>
            <Header/>
            <main className="w-fit m-auto">
                {isObject(children) ? [children] : children}
            </main>
       </>
    )
}

GuestLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
