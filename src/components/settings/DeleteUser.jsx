import { useState } from "react"
import Post from '../API/Post'
import { useDispatch, useSelector } from "react-redux"
import { setAuthUser, setToken } from "../../stores/authStore"
import {Formik, Field, Form} from 'formik'
import { deleteAccountSchema } from "../../Valdation"

export default function DeleteUser() {
    let dispatch = useDispatch()
    let {authUser} = useSelector(state => state.auth)
    let [Errors, setErrors] = useState({})

    function DeleteUser (form) {        
        Post('delete-account/' + authUser.id, form)
        .then(() =>{
            dispatch( setToken(null))
            dispatch( setAuthUser(null))
        })
        .catch((error) => {
            setErrors(error)
            setTimeout(() => {setErrors({})},3000)
        })
            
    }  

    return (
        <Formik
        initialValues={{
            password:'',              
        }}
        onSubmit={DeleteUser}
        validationSchema={deleteAccountSchema}>
            {({errors, touched}) => (
                <Form
                    className="flex flex-col border-2 border-blue-600 rounded-lg p-4 w-fit m-auto mt-40">
                    <Field 
                        name='password'
                        className="w-96 p-2 mb-2"
                        type="password" 
                        placeholder="Enter Password" />
                    <p 
                        className="text-red-700 my-2">
                        {touched.password &&(errors.password?? Errors.password)}
                    </p>
                    <button
                        type="submit"
                        className="bg-blue-600 rounded-lg p-2">
                        Delete Account
                    </button>
                </Form>
            )}    
        </Formik>
    )
}