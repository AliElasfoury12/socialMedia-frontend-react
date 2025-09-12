import { useDispatch, useSelector } from "react-redux"
import { useRef, useState } from "react"
import { setAuthUser } from "../../stores/authStore"
import { EmailInput, NameInput, PasswordInput } from "../../components/Form/Inputs"
import { formValdaitor } from "../../components/Form/FormValdation"
import { emptyObject } from "../../utils/objects"
import DefaultLayout from "../../components/layouts/DefaultLayout"
import { Put } from "../../components/API/APIMethods"

export default function ChangeUserNameAndEmail() {
    const dispatch = useDispatch()
    const {authUser} = useSelector(state => state.auth)
    const form = useRef({name: authUser.name, email: authUser.email , password: ''})
    const [Errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)

    const rules = {
        name: 'required|min:4|max:100',
        email: 'required|min:4|email|max:100',
        password: 'required|min:4|max:100',
    }

    function edit  () {
        Put('users/'+ authUser.id, form.current)
        .then((data) => {
            dispatch(setAuthUser(data.user))
        })
        .catch((errors) => {
            setErrors(errors)  
        })
    }

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
        if(emptyObject(Errors)) edit()
    }

    return (
        <DefaultLayout>
            <form 
                onChange={handleChange}
                onSubmit={handleSubmit}
                className="form justify-center h-[90lvh]">
                {NameInput(Errors, authUser.name)}
                {EmailInput(Errors, authUser.email)}
                {PasswordInput(Errors, showPassword, () => setShowPassword(!showPassword))}
                <button 
                    className="bg-blue-500 text-white w-96 py-1 rounded-lg" 
                    type="submit">
                    Update
                </button>
            </form> 
        </DefaultLayout>
    )
}