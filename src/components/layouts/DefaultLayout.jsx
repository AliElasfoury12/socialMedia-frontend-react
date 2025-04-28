import Header from "./Header"
import PropTypes from 'prop-types'
import router from "../../Router"

export default function DefaultLayout ({children}) {
    const token = localStorage.getItem('token')
    if(!token) return router.navigate('/login')
        
    return (
        <>
            <Header/>
            {children}
        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.object,
}