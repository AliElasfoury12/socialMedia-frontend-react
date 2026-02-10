import { useRef } from "react"
import BigLoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner"
import { formValidator } from "../../../components/Form/FormValdation"
import { emptyObject } from "../../../utils/objects"
import { useDispatch, useSelector } from "react-redux"
import { setErrors } from "../../../stores/auth/auth_slice"
import { findUserAndSendOTP } from "../../../stores/auth/auth_thunks"
import { EmailInput } from "../../../components/Form/Inputs"
import GuestLayout from "../../../components/layouts/GuestLayout"

export default function FindUser() {
    const dispatch = useDispatch()
    const { errors, loading } = useSelector(state => state.auth)
    const form = useRef({email: ''})

    const rules = {
        email: 'required|min:4|email|max:100',
    }

    function handleChange(e) {
        const {name, value} = e.target
        form.current[name] = value
        const _errors = formValidator.inputValidate(rules, form.current, name)         
        dispatch(setErrors(_errors))
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        if(emptyObject(errors))dispatch(findUserAndSendOTP(form.current))
    }

    function findUserForm () {
        return (
            <form 
                onChange={handleChange}
                onSubmit={handleSubmit}
                className="form">
                <h1
                    className="my-5 block text-center">
                    Please Enter Your Email to Find Your Account 
                </h1>
                {EmailInput(errors)}
                <div>
                    {loading && <BigLoadingSpinner/>}
                </div> 
                <button
                    type="submit" 
                    className="bg-blue-600 rounded-md w-24 py-1 self-end text-white">
                    Search
                </button>
            </form> 
        )
    }

    return (
        <GuestLayout>
            <div
                className="w-fit m-auto flex flex-col items-center mt-20">
                <h1 
                    className="text-blue-700 text-2xl">
                    Find Your Account
                </h1>
                {findUserForm()}  
            </div>
        </GuestLayout>
    )
}
