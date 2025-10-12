import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../stores/auth/auth_thunks"
import GuestLayout from "../../components/layouts/GuestLayout"
import { formValdaitor } from "../../components/Form/FormValdation"
import { useEffect, useRef, useState } from "react"
import BigLoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { emptyObject } from "../../utils/objects"
import { EmailInput, PasswordInput } from "../../components/Form/Inputs"

export default function LoginPage() {
    const dispatch = useDispatch()
    const { errors, loading } = useSelector(state => state.auth)
    const form = useRef({email: '', password: ''})
    const [Errors, setErrors] = useState(errors)
    const [showPassword, setShowPassword] = useState(false)

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

    function LoginForm () {
        return (
            <form 
                onChange={handleChange}
                onSubmit={(e) => handleSubmit(e)}
                className="form">
                {EmailInput(Errors)}
                {PasswordInput(Errors, showPassword, () => dispatch(setShowPassword(!showPassword)))}
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
                {LoginForm()}
                <div className="my-1">{loading && <BigLoadingSpinner/>}</div>
                {Links()}
            </div>
       </GuestLayout>
    )
}
