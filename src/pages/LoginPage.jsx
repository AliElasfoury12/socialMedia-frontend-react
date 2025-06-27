import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import Form from "../components/Form/Form"
import { api, Post } from "../components/API/APIMethods"
import { setAuthUser, setToken } from "../stores/authStore"
import { useState } from "react"
import GuestLayout from "../components/layouts/GuestLayout"
import router from "../Router"

export default function LoginPage() {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})

    const validation = {
        email: 'required|min:4|email',
        password: 'required|min:4'
    }
    
    function login (form) 
    {
        Post('login',form)
        .then((data) => {               
            if(data && data.user && data.token) {
                dispatch(setAuthUser(data.user))
                dispatch(setToken(data.token))
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('token', data.token)
                api.setToken(data.token)
                router.navigate('/')
            }  
        })
        .catch(({errors}) => {            
            setErrors({email: [errors.email]}) 
        })
    }

    return (
        <GuestLayout>            
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
       </GuestLayout>
    )
}
