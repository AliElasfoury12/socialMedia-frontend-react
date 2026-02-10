import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setAuthUser, setToken } from "../../stores/auth/auth_slice"
import { api, Delete } from "../../components/API/APIMethods"
import { formValidator } from "../../components/Form/FormValdation"
import { emptyObject } from "../../utils/objects"
import { PasswordInput } from "../../components/Form/Inputs"
import DeleteConfirmModal from "../../components/Modals/DeleteConfirmModal"
import DefaultLayout from "../../components/layouts/DefaultLayout"
import { storage } from "../../utils/storage"
import router from "../../Router"

export default function DeleteUser() {
    const dispatch = useDispatch()
    const [Errors, setErrors] = useState({})
    const form = useRef({password: ''})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmDeletet, setShowConfirmDeletet] = useState(false)

    function DeleteUser () {        
        Delete('users', form.current)
        .then(() =>{
            dispatch(setAuthUser(null))
            dispatch(setToken(null))
            storage.delete('user')
            storage.delete('token')
			api.setToken(null)
        })
        .then(() => {
            router.navigate('/login')
        })
        .catch(({errors}) => {
            setErrors(errors)
        })   
    }  

    const rules = {
        password: 'required|min:4'
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
        if(emptyObject(Errors) && form.current.password != '') setShowConfirmDeletet(true)
    }

    return (
        <DefaultLayout>
            <form 
                onChange={handleChange}
                onSubmit={(e) => handleSubmit(e)}
                className="form w-fit m-auto h-[90lvh] justify-center">
                {PasswordInput(Errors, showPassword, () => dispatch(setShowPassword(!showPassword)))}
                <button 
                    className="bg-blue-500 text-white w-96 py-1 rounded-lg" 
                    type="submit" >
                    Delete Account
                </button>
            </form> 

            <DeleteConfirmModal 
                showConfirmDelete={showConfirmDeletet} 
                setShowConfirmDelete={(state) => {
                    if(emptyObject(Errors) && form.current.password != '')
                        setShowConfirmDeletet(state)
                }} 
                confirmDeleteFunction={DeleteUser}
            />
        </DefaultLayout>
    )
}