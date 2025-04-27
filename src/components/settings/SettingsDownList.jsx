import PropTypes from 'prop-types'
import Logout from "../auth/Logout"
import { Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SettingsDownList() {
	
   return (				
		<div 
			className=" bg-blue-500 rounded-md h-fit py-2 w-52 right-0 top-12
					flex flex-col absolute  items-center z-10 down">
					
			<div 
				className="bg-blue-300 mt-1 rounded-md w-48 py-1 flex justify-start text-lg">
				<Settings className='w-6 h-6 mt-1 mx-2'/>
				<Link to={'/settings'}>Settings</Link>
			</div>
			
			<div >
				<Logout />
			</div>
		</div>
   )
}

SettingsDownList.propTypes = {
   post: PropTypes.object,
}