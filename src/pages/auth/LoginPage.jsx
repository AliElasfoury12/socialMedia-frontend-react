import { useDispatch, useSelector } from "react-redux"
import { login } from "../../stores/auth/auth_thunks"
import GuestLayout from "../../components/layouts/GuestLayout"
import { formValidator } from "../../components/Form/FormValdation"
import { useEffect, useRef, useState } from "react"
import BigLoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { emptyObject } from "../../utils/objects"
import { Link } from "react-router-dom"
import LoginForm from "../../components/Auth/LoginForm"

export default function LoginPage() {
    const dispatch = useDispatch()
    const { errors, loading2 } = useSelector(state => state.auth)
    const form = useRef({email: '', password: ''})
    const [Errors, setErrors] = useState(errors)

    const rules = {
        email: 'required|min:4|email',
        password: 'required|min:4'
    }

    useEffect(() => {
        setErrors({...errors})
    },[errors])

    function handleChange(e) {
        const {name, value} = e.target
        form.current[name] = value
        const _errors = formValidator.inputValidate(rules, form.current, name)        
        setErrors(_errors)        
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        const _errors = formValidator.formValidate(rules, form.current)        
        setErrors(_errors)  
        if(emptyObject(Errors))dispatch(login(form.current))
    }

    function Links () {
        return (
            <div className="flex flex-col w-full text-blue-700 mt-2">
                <Link 
                    to={'/register'}>
                    Create new Account
                </Link>

                <Link 
                    to={'/find_user'}
                    className="mt-2 text-sm">
                    Forget Password ?
                </Link>
            </div>
        )
    }
        
    return (
        <GuestLayout>            
            <div className="flex flex-col justify-center h-[90vh] items-center w-fit m-auto">
                <h1 className="text-3xl mb-5 text-blue-700">Login</h1>
                <LoginForm {...{handleChange,handleSubmit,Errors}}/>
                <div className="my-1">{loading2 && <BigLoadingSpinner/>}</div>
                {Links()}
            </div>
       </GuestLayout>
    )
}