import { useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import Form from "../../Form"
import { POST } from "../API/APIMethods"

export default function Register () {
    let navigate = useNavigate()
    let [errors, setErrors] = useState({})

    let validation = {
        name: 'required|min:4',
        email: 'required|min:4|email',
        password: 'required|min:4',
        password_confirmation: 'required|min:4'
    }

    function register (form)
    {
        POST('register', form)
        .then(() => {
            navigate('/login')
        })
        .catch(({errors}) => {
            errors.email && setErrors({email: errors.email})   
        })
    }

    return (
        <div className="flex flex-col justify-center h-[100vh] items-center w-fit m-auto">
           <Form 
                fields={[
                    {name: 'name', placeholder: 'Enter Your Name'},
                    {name: 'email', placeholder: 'Enter Your Email'},
                    {name: 'password', type: 'password', placeholder: 'Enter Your Password'},
                    {name: 'password_confirmation', type: 'password', placeholder: 'Confirm Password', label: 'Password Confirmation'}
                ]} 
                styles={{submit: 'bg-blue-600 text-white rounded-lg py-1'}}
                submit={{value :'Register', fun: register}}
                validation={validation}
                errors={errors}
                reset={false}/>
            
            <p className="flex gap-4 self-start mt-4 ml-2">
                <span>Have Acount already!</span>
                <Link className="text-blue-700" to={'/login'}>
                    Login
                </Link>
            </p>
        </div>
    )
}
