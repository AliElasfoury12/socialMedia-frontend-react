import { useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import Post from "../API/Post"
import {Formik, Field, Form} from 'formik'
import { registerSchema } from "../../Valdation"

export default function Register () {
    let navigate = useNavigate()

    let [Errors, setErrors] = useState({
        name:'',
        email:'',
        password: ''
    })

    const register = (form, actions) => {
        Post('register', form)
        .then(() => {
            actions.resetForm()
            navigate('/login')
        })
        .catch((error) => {
            error.name && setErrors({name: error.name[0]})  
            error.email && setErrors({email: error.email[0]})   
            error.password && setErrors({password: error.password[0]})  
        })
    }

    return (
        <Formik
        initialValues={{
            name: '',
            email: '',
            password:'',
            password_confirmation: ''
        }}
        onSubmit={register}
        validationSchema={registerSchema} >

        {({errors, touched}) => (
            <Form 
            className="m-auto w-fit mt-32 border-blue-600 rounded-md border-2 py-6 px-9 flex flex-col">

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

                <Field type="password" placeholder="password" name="password"
                className="border-blue-600  rounded-md border-2 p-2 mb-3 w-96"/>
                <p className="text-red-700 mb-1">
                    {touched.password &&(errors.password?? Errors.password)}
                </p>

                <Field type="password" placeholder="confirm password" name="password_confirmation"
                className="border-blue-600  rounded-md border-2 p-2 mb-3 w-96"/>
                <p className="text-red-700 mb-1">
                    {touched.password_confirmation && errors.password_confirmation}
                </p>

                <button type="submit"
                className="bg-blue-600 rounded-md text-white py-1 px-2 mb-2 w-20">
                    Register
                </button>

                <p className="flex">
                Have Acount already!
                <Link className="text-blue-700 ml-2" to={'/login'}>
                    Login
                </Link>
                </p>

            </Form>
        )}
        </Formik>
    )
}
