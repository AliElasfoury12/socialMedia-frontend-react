import Header from "./Header"
import PropTypes from 'prop-types'
import router from "../../Router"
import { useDispatch, useSelector } from "react-redux"
import TimedAlert from "../alerts/TimedAlert"
import { setShowAlert } from '../../stores/app'

export default function DefaultLayout ({children}) {    
    const { token } = useSelector(state => state.auth)
    const { showAlert, alertMessage } = useSelector(state => state.app)
    const dispatch = useDispatch()

    if(!token) { 
        return router.navigate('/login')
    }

    return (
        <>
            <Header/>
            <main className="w-fit m-auto">
                {children}
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