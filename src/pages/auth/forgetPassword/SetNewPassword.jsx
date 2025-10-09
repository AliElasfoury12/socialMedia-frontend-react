import { useParams } from "react-router-dom"
import { useRef, useState } from "react"
import { NewPasswordConfirmInput, NewPasswordInput } from "../../../components/Form/Inputs"
import { useDispatch, useSelector } from "react-redux"
import { formValdaitor } from "../../../components/Form/FormValdation"
import { emptyObject } from "../../../utils/objects"
import { setNewPassword, setErrors } from "../../../stores/authStore"
import BigLoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner"

export default function SetNewPassword() {
    const dispatch = useDispatch()
    const { email } = useParams()
    const { errors, loading } = useSelector(state => state.auth)
    const form = useRef({new_password: '', new_password_confirmation: '', email: email})
    const [showNewPassword, setShowNewPassword] = useState(false)
    
    const rules = {
        new_password: 'required|min:4|max:100',
        new_password_confirmation: 'required|min:4|match:new_password|max:100'
    }

    function handleChange(e) {
        const {name, value} = e.target
        form.current[name] = value
        const _errors = formValdaitor.inputValdaite(rules, form.current, name) 
        dispatch(setErrors(_errors))
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        const _errors = formValdaitor.formValdaite(rules, form.current)        
        dispatch(setErrors(_errors)) 
        if(emptyObject(errors)) dispatch(setNewPassword(form.current))
    }

    return (
        <div className="m-auto w-fit rounded-md mt-20 flex flex-col items-center gap-5">
            <h1 className="text-blue-700 text-2xl"> Set New Password </h1>
            <form 
                onChange={handleChange}
                onSubmit={handleSubmit}  
                className="form ">
                {NewPasswordInput(errors, showNewPassword, () => setShowNewPassword(!showNewPassword))}
                {NewPasswordConfirmInput(errors, showNewPassword)}
                <p className="text-red-700">{errors.otp && errors.otp[0]}</p>
                <div>{loading && <BigLoadingSpinner/>}</div>
                <button 
                    type="submit"
                    className="bg-blue-600 rounded-md text-white py-1 px-2 mb-2 w-20">
                    Save
                </button>
            </form>
        </div>
    )
}
