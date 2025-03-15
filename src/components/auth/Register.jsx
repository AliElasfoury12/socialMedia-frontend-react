import { useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import Post from "../API/Post"
import Form from "../../Form"

export default function Register () {
    let navigate = useNavigate()
    let [errors, setErrors] = useState({})

    let validation = {
        name: 'required|min:4',
        email: 'required|min:4|email',
        password: 'required|min:4',
        password_confirmation: 'required|min:4'
    }

    const register = (form) => {
        Post('register', form)
        .then(() => {
            navigate('/login')
        })
        .catch((error) => {
           /* error.name && setErrors({name: error.name[0]})  
            error.email && setErrors({email: error.email[0]})   
            error.password && setErrors({password: error.password[0]})  */
        })
    }

    return (
        <div className="flex flex-col justify-center h-[100vh] items-center w-fit m-auto">
           <Form 
                fields={[
                    {name: 'name', placeholder: 'Enter Your Name'},
                    {name: 'email', placeholder: 'Enter Your Email'},
                    {name: 'password', type: 'password', placeholder: 'Enter Your Password'},
                    {name: 'password_confirmation', type: 'password', placeholder: 'Confirm Password', label: 'Password Confirmation'}
                ]} 
                styles={{submit: 'bg-blue-600 text-white rounded-lg py-1'}}
                submit={{value :'Login', fun: register }}
                validation={validation}
                errors={errors}/>
        </div>
        /*
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
        </Formik>*/
    )
}
