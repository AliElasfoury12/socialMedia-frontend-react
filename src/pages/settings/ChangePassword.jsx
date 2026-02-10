import { useRef, useState } from "react"
import { formValidator } from "../../components/Form/FormValdation"
import { emptyObject } from "../../utils/objects"
import { CustomePasswordInput, NewPasswordConfirmInput, NewPasswordInput } from "../../components/Form/Inputs"
import BigLoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { Post } from "../../components/API/APIMethods"
import DefaultLayout from "../../components/layouts/DefaultLayout"
import { useDispatch } from "react-redux"
import { Alert } from "../../stores/app"

export default function ChangePassword() {
    const dispatch = useDispatch()
    const [Errors, setErrors] = useState({})
    const form = useRef({current_password: '',new_password: '', new_password_confirmation: ''})
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [loading, setloading] = useState(false)

    const rules = {
        current_password: 'required|min:4|max:100',
        new_password: 'required|min:4|max:100',
        new_password_confirmation: 'required|min:4|match:new_password|max:100'
    }

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

        if(emptyObject(Errors)) {
            setloading(true)

            Post('auth/changePassword', form.current)
            .then(() => {
                dispatch(Alert('password updated successfully'))
            })
            .catch((err) => {
                setErrors(err.errors)
            })
            .finally(() => setloading(false))
        }
    }

    function CurrentPasswordInput () {
        const input_data = {
            label: 'Current Password',
            name: 'current_password',
            showPassword: showCurrentPassword,
            setShowPassword: () => setShowCurrentPassword(!showCurrentPassword),
            placeholder: "Enter your Current Password",
            Errors: Errors
        }
        return CustomePasswordInput(input_data)
    }

    return (
        <DefaultLayout>
            <div className="m-auto w-fit rounded-md mt-20 flex flex-col items-center gap-5">
                <h1 className="text-blue-700 text-2xl"> Set New Password </h1>
                <form 
                    onChange={handleChange}
                    onSubmit={handleSubmit}  
                    className="form ">
                    {CurrentPasswordInput()}
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
        </DefaultLayout>
    )
}