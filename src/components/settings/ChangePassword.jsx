import { useState } from "react"
import Post from '../API/Post'
import {Formik, Field, Form} from 'formik'
import { changePasswordSchema } from "../../Valdation"

export default function ChangePassword() {
   let [Errors, setErrors] = useState({
    current_password: '',
    new_password: ''
   })

    let changePassword = (data, actions) => {
        Post('changePassword',data)
        .then( 
            actions.resetForm() 
        )
        .catch((error) => {
            error?.current_password && setErrors({current_password: error.current_password[0]}) 
            error?.new_password && setErrors({new_password: error.new_password[0]}) 
        })
    }

  return (
     <Formik 
        initialValues={{
            current_password: '',
            new_password: '',
            new_password_confirmation: ''
        }}
        onSubmit={changePassword}
        validationSchema={changePasswordSchema} >

        {({errors, touched}) => (
            
             <Form   className="m-auto w-fit border-blue-600 rounded-md border-2
                py-6 px-9 flex flex-col mt-20">
                <Field name="current_password"
                type="password" placeholder="Current Password" 
                className="border-blue-600 rounded-md border-2 p-2 mb-3 w-80"/>
                < p className="text-red-700 mb-1">
                    {touched.current_password && 
                    (errors.current_password ?? Errors.current_password )} 
                </p>
            
                <Field name="new_password"
                type="password" placeholder="New Password" 
                className="border-blue-600 rounded-md border-2 p-2 mb-3 w-80"/>
                <p  className="text-red-700 mb-1">
                    {touched.new_password && (errors.new_password ?? Errors.new_password) }
                </p>
    
                <Field name="new_password_confirmation"
                type="password" placeholder="Confirm Password" 
                className="border-blue-600 rounded-md border-2 p-2 mb-3 w-80"/>
                 <p  className="text-red-700 mb-1">
                    {touched.new_password_confirmation && errors.new_password_confirmation}
                </p>
                
                <button 
                    type="submit"
                    className="bg-blue-600 rounded-md text-white py-1 px-2 mb-2 w-20">
                    Update
                </button>
            </Form>
           
        )}
       
        
    </Formik>
  )
}