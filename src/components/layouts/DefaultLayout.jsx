import Header from "./Header"
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import TimedAlert from "../alerts/TimedAlert"
import { setShowAlert } from '../../stores/app'
import { isObject } from "../../utils/objects"
import { GetNewAccessToken } from "../../stores/auth/auth_thunks"
import { useEffect } from "react"
import router from "../../Router"

export default function DefaultLayout ({children}) {
    const dispatch = useDispatch()    
    const { token, loading, isAuthChecked } = useSelector(state => state.auth)
    const { showAlert, alertMessage } = useSelector(state => state.app)
    const isCheckingAuth = !token && !isAuthChecked
    
    useEffect(() => {
        if(isCheckingAuth) dispatch(GetNewAccessToken()) 
    },[])

    if(loading || isCheckingAuth) return <h1>Loading...</h1>

    if(!token && isAuthChecked) {
        router.navigate('/login')
        return ''
    }

    return (
        <>
            <Header/>
            <main className="w-fit m-auto">
                {isObject(children) ? [children] : children}
            </main>
            <TimedAlert show={showAlert} setShow={(s) => dispatch(setShowAlert(s))}>
                {alertMessage}
            </TimedAlert>
        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.any,
}