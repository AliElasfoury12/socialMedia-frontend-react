import { useRef, useState } from "react"
import { formValdaitor } from "../Form/FormValdation"
import { emptyObject } from "../../utils/objects"
import { NewPasswordConfirmInput, NewPasswordInput } from "../Form/Inputs"
import BigLoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import { Post } from "../API/APIMethods"

export default function ChangePassword() {
    const [Errors, setErrors] = useState({})
    const form = useRef({current_password: '',new_password: '', new_password_confirmation: ''})
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [loading, setloading] = useState(false)

    const rules = {
        new_password: 'required|min:4|max:100',
        new_password_confirmation: 'required|min:4|match:new_password|max:100'
    }

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

        if(emptyObject(Errors)) {
            setloading(true)

            Post('auth/changePassword', form.current)
            .catch((errors) => {
                setErrors(errors)
            })
            .finally(() => setloading(false))
        }
    }

    return (
        <div className="m-auto w-fit rounded-md mt-20 flex flex-col items-center gap-5">
            <h1 className="text-blue-700 text-2xl"> Set New Password </h1>
            <form 
                onChange={handleChange}
                onSubmit={handleSubmit}  
                className="form ">
                {NewPasswordInput(Errors, showNewPassword, () => setShowNewPassword(!showNewPassword))}
                {NewPasswordConfirmInput(Errors, showNewPassword)}
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