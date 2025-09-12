import PropTypes from 'prop-types'
import { Settings} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from "../../stores/authStore"
import { LogOutIcon } from 'lucide-react'

export default function SettingsDownList() {
	const dispatch = useDispatch()
	const class1 = "rounded-md w-48 p-2 flex justify-start items-center gap-1 bg-blue-300 text-xl" 

   return (				
		<div 
			className=" bg-blue-500 rounded-md py-2 w-52 h-fit absolute right-0 top-12 flex flex-col items-center gap-1 z-10 down">
					
			<Link 
				className={class1}
				to={'/settings'}>
				<Settings/>
				Settings
			</Link>
			
			<button
				onClick={() => dispatch(logout())} 
				className={`text-red-800 ${class1}` }>	
				<LogOutIcon/>
				logout
			</button>
		</div>
   )
}

SettingsDownList.propTypes = {
   post: PropTypes.object,
}