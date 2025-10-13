import { useSelector } from "react-redux"
import router from "../../Router"
import Header from "./Header"
import PropTypes from 'prop-types'

export default function GuestLayout ({children}) {
    const { token } = useSelector(state => state.auth)
    if(token) {
        router.navigate('/')
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

GuestLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}
