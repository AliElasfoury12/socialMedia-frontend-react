import { useState } from "react"
import Post from "../../API/Post"
import { forgetPasswordSchema } from "../../../Valdation"
import { useNavigate } from "react-router-dom"
import BigLoadingSpinner from "../../LoadingSpinner/LoadingSpinner"

export default function ForgetPassword() {
    const [email,setEmail] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    let sendRequset = () => {
        Post('forgetPassword',{email: email})
        .then((data) => {
            if(data.message == 'Email Exists') { 
               navigate('/forgetPasswordOTP/' + email)                
            }
        })
        .catch((error) => {
            setLoading(false)
            error.email && setError(error.email[0])   
        })
    }

    let searchEmail = () => {
        forgetPasswordSchema.validate({email: email})
        .then(() => {
            sendRequset()
            setLoading(true)
        })
        .catch((error) => {
            console.log(error.errors, error);
            setError(error.errors[0])
        })
    }

    return (
        <div
            className="w-fit m-auto flex flex-col mt-20 ">
            <h1 
                className="text-blue-700 text-2xl">
                Find Your Account
            </h1>

            <label
                className="my-5">
                Please Enter Your Email to Find Your Account 
            </label>
            <input 
                onChange={(e) => {setEmail(e.target.value)}}
                className="w-96 h-12 px-2 border border-1 border-blue-600 rounded-md"
                placeholder="Enter Your Email" 
                type="text" />

            <p className="text-red-800 mt-2">
                {error}
            </p>
            <button
                type="submit" 
                onClick={searchEmail}   
                className="bg-blue-600 rounded-md mt-4 w-24 py-1 self-end text-white">
                Search
            </button>
            
            <div
                className="mt-5">
                {loading && <BigLoadingSpinner/>}
            </div>   
        </div>
    )
}
