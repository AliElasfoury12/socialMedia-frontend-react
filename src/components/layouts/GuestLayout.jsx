import router from "../../Router"
import Nav from "./Nav"
import PropTypes from 'prop-types'

export default function GuestLayout ({children}) {
   const token = localStorage.getItem('token')
   if(token) return router.navigate('/')
          
   return (
       <>
           <Nav/>
            {children}
       </>
   )
}

GuestLayout.propTypes = {
    children: PropTypes.object,
}
