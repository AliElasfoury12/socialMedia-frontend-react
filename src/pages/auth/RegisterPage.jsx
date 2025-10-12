import { Link } from "react-router-dom"
import GuestLayout from "../../components/layouts/GuestLayout"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../stores/auth/auth_thunks"
import { useEffect, useRef, useState } from "react"
import { formValdaitor } from "../../components/Form/FormValdation"
import { emptyObject } from "../../utils/objects"
import BigLoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { NameInput, EmailInput, PasswordInput, PasswordConfirmInput } from "../../components/Form/Inputs"

export default function RegisterPage () {
    const dispatch = useDispatch()
    const { errors, loading } = useSelector(state => state.auth)
    const form = useRef({name: '', email: '', password: '', password_confirmation: ''})
    const [Errors, setErrors] = useState(errors)
    const [showPassword, setShowPassword] = useState(false)

    const rules = {
        name: 'required|min:4|max:100',
        email: 'required|min:4|email|max:100',
        password: 'required|min:4|max:100',
        password_confirmation: 'required|min:4|match:password|max:100'
    }

    useEffect(() => {
        setErrors({...errors})
    },[errors])

    function handleChange(e) {
        const {name, value} = e.target
        form.current[name] = value
        const _errors = formValdaitor.inputValdaite(rules, form.current, name) 
        setErrors({..._errors}) 
    }

    function handleSubmit(e) {
        e.preventDefault()
        const _errors = formValdaitor.formValdaite(rules, form.current)        
        setErrors(_errors)  
        if(emptyObject(Errors))dispatch(register(form.current))
    }

    function RegisterForm () {
        return (
            <form 
                onChange={handleChange}
                onSubmit={handleSubmit}
                className="form">
                {NameInput(Errors)}
                {EmailInput(Errors)}
                {PasswordInput(Errors, showPassword, () => setShowPassword(!showPassword))}
                {PasswordConfirmInput(Errors, showPassword)}
                <button 
                    className="bg-blue-500 text-white w-96 py-1 rounded-lg" 
                    type="submit">
                    Register
                </button>
            </form> 
        )
    }

    return (
       <GuestLayout>            
            <div className="flex flex-col justify-center h-[90vh] items-center w-fit m-auto">
                <h1 className="text-3xl mb-5 text-blue-700">Register</h1>
                {RegisterForm()}
                {loading && <BigLoadingSpinner/>}
                <Link 
                    className="text-blue-700 mt-2" 
                    to={'/login'}>
                    Have Acount already!Login
                </Link>
            </div>
       </GuestLayout>
    )
}
