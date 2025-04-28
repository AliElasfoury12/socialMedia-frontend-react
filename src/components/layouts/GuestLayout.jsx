import router from "../../Router"
import Header from "./Header"
import PropTypes from 'prop-types'

export default function GuestLayout ({children}) {
   const token = localStorage.getItem('token')
   if(token) return router.navigate('/')
          
   return (
       <>
           <Header/>
            {children}
       </>
   )
}

GuestLayout.propTypes = {
    children: PropTypes.object,
}
