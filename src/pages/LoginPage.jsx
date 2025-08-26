import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Form from "../components/Form/Form"
import { login } from "../stores/authStore"
import GuestLayout from "../components/layouts/GuestLayout"

export default function LoginPage() {
    const dispatch = useDispatch()
    const { errors } = useSelector(state => state.auth)

    const validation = {
        email: 'required|min:4|email',
        password: 'required|min:4'
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
                    submit={{value :'Login', fun: (form) => dispatch(login(form)) }}
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
