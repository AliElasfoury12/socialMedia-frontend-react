import router from "../../Router"
import { storage } from "../../utils/storage"
import Header from "./Header"
import PropTypes from 'prop-types'

export default function GuestLayout ({children}) {
   const token = storage.get('token')
    if(token) router.navigate('/')
          
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
