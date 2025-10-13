import Header from "./Header"
import PropTypes from 'prop-types'
import router from "../../Router"
import { useSelector } from "react-redux"

export default function DefaultLayout ({children}) {    
    const { token } = useSelector(state => state.auth)
    if(!token) { 
        router.navigate('/login')
        return
    }

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