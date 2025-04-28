import router from "../../Router"
import Header from "./Header"
import PropTypes from 'prop-types'

export default function GuestLayout ({children}) {
   const token = localStorage.getItem('token')
   if(token) return router.navigate('/')
          
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
    children: PropTypes.object,
}
