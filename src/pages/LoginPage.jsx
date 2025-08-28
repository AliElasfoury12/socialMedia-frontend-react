import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../stores/authStore"
import GuestLayout from "../components/layouts/GuestLayout"
import { formValdaitor } from "../components/Form/FormValdation"
import { useEffect, useRef, useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import BigLoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import { emptyObject } from "../utils/objects"

export default function LoginPage() {
    const dispatch = useDispatch()
    const { errors, loading } = useSelector(state => state.auth)
    const form = useRef({email: '', password: ''})
    const [Errors, setErrors] = useState(errors)
    const [showPassword, setShowPassword] = useState(false)
    const labelClass = 'block mb-1'
    const inputClass = 'w-96 h-9 pl-3 rounded-lg'

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
        const _errors = formValdaitor.inputValdaite(rules, form.current, name)        
        setErrors(_errors)        
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        const _errors = formValdaitor.formValdaite(rules, form.current)        
        setErrors(_errors)  
        if(emptyObject(Errors))dispatch(login(form.current))
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

    function LoginForm () {
        return (
            <form 
            onChange={handleChange}
            onSubmit={(e) => handleSubmit(e)}
                className="space-y-4">
                {EmailInput()}
                {PasswordInput()}
                <button 
                    className="bg-blue-500 text-white w-96 py-1 rounded-lg" 
                    type="submit" >
                        Login
                </button>
            </form> 
        )
    }

    function Links () {
        return (
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
        )
    }
    
    return (
        <GuestLayout>            
            <div className="flex flex-col justify-center h-[90vh] items-center w-fit m-auto">
                <h1 className="text-3xl mb-5 text-blue-700">Login</h1>
                {LoginForm()}
                <div className="my-5">{loading && <BigLoadingSpinner/>}</div>
                {Links()}
            </div>
       </GuestLayout>
    )
}
