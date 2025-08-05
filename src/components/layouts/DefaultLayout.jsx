import Header from "./Header"
import PropTypes from 'prop-types'
import router from "../../Router"

export default function DefaultLayout ({children}) {
    const token = localStorage.getItem('token')
    if(!token) return router.navigate('/login')
        
    return (
        <>
            <Header/>
            <main className="w-fit m-auto">
                {children}
            </main>
        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.any,
}