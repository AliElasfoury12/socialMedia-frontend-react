import { Link, useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux"
import {Formik, Field, Form} from 'formik'
import { loginSchema } from "../../Valdation"
//import Post from "../API/Post"
import { POST } from "../API/APIMethods"
import { setAuthUser, setToken } from "../../stores/authStore"
import { useState } from "react"

export default function Login() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [Errors, setErrors] = useState({
        email:''
    })
    let login = (form) => {
    POST('login',form)
    .then((data) => {
        dispatch(setAuthUser(data.user))
        dispatch(setToken(data.token))
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        navigate('/')
    })
    .catch((error) => {
        setErrors({email: error.email[0]}) 
    })
    }

  return (
    <Formik
        initialValues={{
            email: '',
            password:'',
        }}
        onSubmit={login}
        validationSchema={loginSchema} >

        {({errors, touched}) => (
            <Form 
            className="m-auto w-fit mt-32 border-blue-600 rounded-md border-2 py-6 px-9 flex flex-col">
                
                <Field type="email" placeholder="email" name="email"
                className="border-blue-600 rounded-md border-2 p-2 mb-3 w-96" />
                <p className="text-red-700 mb-1">
                    {touched.email &&(errors.email?? Errors.email)}
                </p>

                <Field type="password" placeholder="password" name="password"
                className="border-blue-600  rounded-md border-2 p-2 mb-3 w-96"/>
                <p className="text-red-700 mb-1">
                    {touched.password && errors.password}
                </p>

                <button type="submit"
                className="bg-blue-600 rounded-md text-white py-1 px-2 mb-2 w-20">
                    Login
                </button>

                <Link 
                    to={'/register'}
                    className="text-blue-700 ml-2">
                    Creta a new Account
                </Link>

                <Link 
                    to={'/forgetpassword'}
                    className="text-blue-700 ml-2 mt-2 text-sm self-end">
                    Forget Password ?
                </Link>

            </Form>
        )}
    </Formik>
  )
}
