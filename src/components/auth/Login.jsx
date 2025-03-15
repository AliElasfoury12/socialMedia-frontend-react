import { Link, useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux"
import Form from "../../Form"
import { POST } from "../API/APIMethods"
import { setAuthUser, setToken } from "../../stores/authStore"
import { useState } from "react"

export default function Login() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [errors, setErrors] = useState({})

    let validation = {
        email: 'required|min:4|email',
        password: 'required|min:4'
    }
    
    function login (form) 
    {
        POST('login',form)
        .then((data) => {               
            if(data && data.user && data.token) {
                dispatch(setAuthUser(data.user))
                dispatch(setToken(data.token))
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('token', data.token)
                navigate('/')
            }  
        })
        .catch(({errors}) => {            
            setErrors({email: [errors.email]}) 
        })
    }

    return (
        <div className="flex flex-col justify-center h-[90vh] items-center w-fit m-auto">
            <Form 
                fields={[
                    {name: 'email', placeholder: 'Enter Your Email'},
                    {name: 'password', type: 'password', placeholder: 'Enter Your Password'}
                ]} 
                styles={{submit: 'bg-blue-600 text-white rounded-lg py-1'}}
                submit={{value :'Login', fun: login }}
                validation={validation}
                errors={errors}/>
            
            <div className="flex flex-col w-full text-blue-700 mt-2">
                <Link 
                    to={'/register'}>
                    Create new Account
                </Link>

                <Link 
                    to={'/forgetpassword'}
                    className="mt-2 text-sm">
                    Forget Password ?
                </Link>
            </div>
        </div>
    )
}
