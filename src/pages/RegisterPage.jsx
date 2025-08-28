import { Link } from "react-router-dom"
import GuestLayout from "../components/layouts/GuestLayout"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../stores/authStore"
import { useEffect, useRef, useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { formValdaitor } from "../components/Form/FormValdation"
import { emptyObject } from "../utils/objects"
import BigLoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"

export default function RegisterPage () {
    const dispatch = useDispatch()
    const { errors, loading } = useSelector(state => state.auth)
    const form = useRef({name: '', email: '', password: '', password_confirmation: ''})
    const [Errors, setErrors] = useState(errors)
    const [showPassword, setShowPassword] = useState(false)
    const labelClass = 'block mb-1'
    const inputClass = 'w-96 h-9 pl-3 rounded-lg'

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

    function NameInput () {
        return (
            <div>
                <label className={labelClass} >Name</label>
                <input type="text" name="name" placeholder="Enter Your Name" className={inputClass} />
                <p className="text-red-600">{Errors.name && Errors.name[0]}</p>
            </div>
        )
    }

    function EmailInput() {
        return(
            <div>
                <label className={labelClass} >Email</label>
                <input type="email" name="email" placeholder="ali@gmail.com" className={inputClass} />
                <p className="text-red-600">{Errors.email && Errors.email[0]}</p>
            </div>
        )
    }

    function PasswordInput () {
        return(
            <div>
                <label className={labelClass} >Password</label>
                <div className="flex items-center gap-1">
                    <input 
                        type={showPassword ? "text":"password"} 
                        name="password" 
                        placeholder="Enter Your Password" 
                        className={inputClass} />
                    <button onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOffIcon/> : <EyeIcon/>}
                    </button>
                </div>
                <p className="text-red-600">{Errors.password && Errors.password[0]}</p>
            </div>  
        )
    }

    function PasswordConfirmInput() {
        return (
            <div>
                <label className={labelClass} >Password Confirmation</label>
                <div className="flex items-center gap-1">
                    <input 
                        type={showPassword ? "text":"password"} 
                        name="password_confirmation" 
                        placeholder="Confirm Your Password" 
                        className={inputClass} />
                </div>
                <p className="text-red-600">{Errors.password_confirmation && Errors.password_confirmation[0]}</p>
            </div>
        )
    }

    function RegisterForm () {
        return (
            <form 
            onChange={handleChange}
            onSubmit={handleSubmit}
                className="space-y-4">
                {NameInput()}
                {EmailInput()}
                {PasswordInput()}
                {PasswordConfirmInput()}
                <button 
                    className="bg-blue-500 text-white w-96 py-1 rounded-lg" 
                    type="submit" >
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
