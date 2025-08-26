import { Link } from "react-router-dom"
import Form from "../components/Form/Form"
import GuestLayout from "../components/layouts/GuestLayout"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../stores/authStore"

export default function RegisterPage () {
    const dispatch = useDispatch()
    const { errors } = useSelector(state => state.auth)

    const validation = {
        name: 'required|min:4',
        email: 'required|min:4|email',
        password: 'required|min:4',
        password_confirmation: 'required|min:4'
    }

    return (
       <GuestLayout>            
            <div className="flex flex-col justify-center h-[90vh] items-center w-fit m-auto">
                <Form 
                    fields={[
                        {name: 'name', placeholder: 'Enter Your Name'},
                        {name: 'email', placeholder: 'Enter Your Email'},
                        {name: 'password', type: 'password', placeholder: 'Enter Your Password'},
                        {name: 'password_confirmation', type: 'password', placeholder: 'Confirm Password', label: 'Password Confirmation'}
                    ]} 
                    styles={{submit: 'bg-blue-600 text-white rounded-lg py-1'}}
                    submit={{value :'Register', fun: (form) => dispatch(register(form))}}
                    validation={validation}
                    errors={errors}
                />
                
                <p className="flex gap-4 self-start mt-4 ml-2">
                    <span>Have Acount already!</span>
                    <Link className="text-blue-700" to={'/login'}>
                        Login
                    </Link>
                </p>
            </div>
       </GuestLayout>
    )
}
