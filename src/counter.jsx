import { useState } from "react";
import Form from "./Form"

export default function Counter() {
    let [errors, setErrors] = useState({})

    let validation= {
        name: 'required|min:4',
        email: 'required|min:4|email',
        password: 'required|min:4'
    }

    function login (form) {
       // setErrors()
    }

    return (
        <div className="flex justify-center h-[90vh] items-center">
            <Form 
                fields={[
                    {name: 'name', placeholder: 'Enter Your Name' },
                    {name: 'email', placeholder: 'Enter Your Email'},
                    {name: 'password', type: 'password', placeholder: 'Enter Your'}
                ]} 
                submit={{value :'Login', fun: login }}
                validation={validation}
                errors={errors}/>
        </div>
    )
}
