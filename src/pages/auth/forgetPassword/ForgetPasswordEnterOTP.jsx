import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { formValdaitor } from "../../../components/Form/FormValdation"
import { useDispatch, useSelector } from "react-redux"
import { checkOTP, resendOTP } from "../../../stores/auth/auth_thunks"
import { setErrors } from "../../../stores/auth/auth_slice"
import { emptyObject } from "../../../utils/objects"
import BigLoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner"

export default function ForgetPasswordEnterOTP () {
    const dispatch = useDispatch()
    const { email } = useParams()
    const form = useRef({otp: ''})
    const { errors, loading } = useSelector(state => state.auth)
    const ALLOWED_TIME = 60       
    const [count, setCount] = useState(ALLOWED_TIME)    

    const rules = {
        otp: 'number|min:6|max:6',
    }

    function handleChange(e) {
        const {name, value} = e.target
        form.current[name] = value
        const _errors = formValdaitor.inputValdaite(rules, form.current, name)         
        dispatch(setErrors(_errors))
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(emptyObject(errors)) dispatch(checkOTP({...form.current, email: email}))
    }

    function counter() {
        if(count <= 0)return 
        setTimeout(() => {setCount(c => c - 1)}, 1000)
    }

    useEffect(() => { 
        counter()
    },[count])
    
    return (
        <form 
            onChange={handleChange}
            onSubmit={handleSubmit}
            className="w-fit m-auto mt-20 form items-center">
            <h1  className="text-blue-700 text-2xl">
                Please Check Your Email and Enter the 6 numbers 
            </h1> 
             
            <input 
                className="input"
                placeholder="Enter The OTP "
                name="otp"
                maxLength={6}
                type="text" />

            <p className="text-red-800"> {errors.otp && errors.otp[0]} </p>
            <p>you can request another otp after 00:{count > 9 ? count: '0' + count} Seconds</p>
            <div> {loading && <BigLoadingSpinner/>} </div>
            
            <div className="flex justify-between w-96 -mt-5">
                <button
                    type="button"
                    onClick={() => {                        
                        if (count == 0) {
                            setCount(ALLOWED_TIME)
                            counter()
                            dispatch(resendOTP({email: email}))
                        }
                    }}   
                    className="bg-blue-600 rounded-md w-28 py-1 text-white">
                    Resend OTP
                </button>
                <button 
                    type="submit"
                    className="bg-blue-600 rounded-md w-24 py-1 text-white">
                    Continue
                </button>
           </div>
        </form>
    )
}
