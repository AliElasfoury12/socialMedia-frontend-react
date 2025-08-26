import { useDispatch } from "react-redux"
import logoutIcon from '../../assets/logout.png'
import { setAuthUser, setToken } from "../../stores/authStore"
import { useNavigate } from "react-router-dom"
import { Get } from "../API/APIMethods"

export default function Logout() {
  let dispatch = useDispatch()
  let navigate = useNavigate()

  let logout = () => {
    Get('auth/logout')
    .then(() => {
        dispatch(setAuthUser(''))
        dispatch(setToken(''))
        localStorage.removeItem('user')
		localStorage.removeItem('token')
        navigate('/login')
    })
  }

    return (
        <button
            onClick={logout} 
            className="items-center h-9 gap-2 text-red-800 text-xl
            bg-blue-300 mt-1 rounded-md w-48 py-1 flex justify-start" >
                
            <img className="w-5 h-5 ml-3 mr-2 " src={logoutIcon} />
            logout
        </button>
    )
}
