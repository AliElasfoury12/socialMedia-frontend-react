import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import  Put  from '../API/Put'
import {Formik, Field, Form} from 'formik'
import { updateUserSchema } from "../../Valdation"
import { setAuthUser } from "../../stores/authStore"

export default function ChangeUserNameAndEmail() {
    let dispatch = useDispatch()
    let {authUser} = useSelector(state => state.auth)

    let [Errors, setErrors] = useState({
        password:'',
        name:'',
        email:'',
      })

    let edit = (form) => {
        Put('users/'+ authUser.id, form)
        .then((data) => {
            dispatch(setAuthUser(data.user))
        })
        .catch((error) => {
            error.password && setErrors({password: error.password[0]})  
            error.name && setErrors({name: error.name[0]})  
            error.email && setErrors({email: error.email[0]})   
        })
    }

    return (
        <Formik
            initialValues={{
                password:'',
                name: authUser.name,
                email: authUser.email              
            }}
            onSubmit={edit}
            validationSchema={updateUserSchema} >

            {({errors, touched}) => (
                <Form 
                className="m-auto w-fit mt-32 border-blue-600 rounded-md border-2 py-6 px-9 flex flex-col">

                    <Field type="password" placeholder="password" name="password"
                    className="border-blue-600 rounded-md border-2 p-2 mb-3 w-96" />
                    <p className="text-red-700 mb-1">
                        {touched.password &&(errors.password?? Errors.password)}
                    </p>

                    <Field type="text" placeholder="name" name="name"
                    className="border-blue-600 rounded-md border-2 p-2 mb-3 w-96" />
                    <p className="text-red-700 mb-1">
                        {touched.name &&(errors.name?? Errors.name)}
                    </p>
                    
                    <Field type="email" placeholder="email" name="email"
                    className="border-blue-600 rounded-md border-2 p-2 mb-3 w-96" />
                    <p className="text-red-700 mb-1">
                        {touched.email &&(errors.email?? Errors.email)}
                    </p>

                    <button type="submit"
                    className="bg-blue-600 rounded-md text-white py-1 px-2 mb-2 w-20">
                        Edit
                    </button>
                </Form>
            )}
        </Formik>
    )
}