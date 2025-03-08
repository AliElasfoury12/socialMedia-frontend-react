import { setNewPasswordSchema } from "../../../Valdation"
import { Field, Form, Formik } from "formik"
import Post from "../../API/Post"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

export default function SetNewPassword() {
    let navigate = useNavigate()
    let { id } = useParams()
    let [error, setError] = useState('')

    let newPassword = (form) => {    
        Post('set-new-password',form)
        .then(() => {
            navigate('/login')                
        })
        .catch((error) => {
            error.otp && setError(error.otp)
        })
    }

    return (
        <Formik 
            initialValues={{
                password: '',
                password_confirmation: '',
                id: id / 5
            }}
            onSubmit={newPassword}
            validationSchema={setNewPasswordSchema} >

            {({errors, touched}) => (
                <Form   className="m-auto w-fit border-blue-600 rounded-md border-2
                    py-6 px-9 flex flex-col mt-20">
                
                    <Field name="password"
                    type="password" placeholder="New Password" 
                    className="border-blue-600 rounded-md border-2 p-2 mb-3 w-80"/>
                    <p  className="text-red-700 mb-1">
                        {touched.password && (errors.password ?? error)}
                    </p>
        
                    <Field name="password_confirmation"
                    type="password" placeholder="Confirm Password" 
                    className="border-blue-600 rounded-md border-2 p-2 mb-3 w-80"/>
                    <p  className="text-red-700 mb-1">
                        {touched.password_confirmation && errors.password_confirmation}
                    </p>
                    
                    <button 
                        type="submit"
                        className="bg-blue-600 rounded-md text-white py-1 px-2 mb-2 w-20">
                        Save
                    </button>
                </Form>
            )}
        </Formik>
    )
}
