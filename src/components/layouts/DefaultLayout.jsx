import Header from "./Header"
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import TimedAlert from "../alerts/TimedAlert"
import { setShowAlert } from '../../stores/app'
import { isObject } from "../../utils/objects"
import { useEffect } from "react"
import { GetNewAccessToken } from "../../stores/auth/auth_thunks"

export default function DefaultLayout ({children}) {    
    const { token, loading } = useSelector(state => state.auth)
    const { showAlert, alertMessage } = useSelector(state => state.app)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!token) dispatch(GetNewAccessToken())  
    },[])

    if(loading || !token) return <h1>Loading...</h1>

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