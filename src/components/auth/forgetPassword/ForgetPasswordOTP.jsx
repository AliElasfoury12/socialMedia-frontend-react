import { useState } from "react"
import Post from "../../API/Post"
import { otpSchema } from "../../../Valdation"
import { useNavigate, useParams } from "react-router-dom"

export default function ForgetPasswordOTP() {
    let [otp, setOtp] = useState(0)
    let [error, setError] = useState('')
    let { email } = useParams()
    let navigate = useNavigate()
    let id

    let sendRequset = () => {
        Post('check-otp',{otp: otp, email: email})
        .then((data)=> {
            id = data.id
            navigate('/setNewPassword/' + id * 5)              
        })
        .catch((error) => {
            error.otp && setError(error.otp[0]) 
        })
    }

    let OTPCheck = () => {
        otpSchema.validate({otp: otp})
        .then(() => {
           sendRequset()
        })
        .catch((error)=> {
            console.log(error.errors, error);
            setError(error.errors[0])
        })
    }

    let resendOtp = () => {
        Post('forgetPassword',{email: email})
    }

    return (
        <div className="w-fit m-auto mt-20 flex flex-col">
            <p>
                Please Check Your Email and Enter the 6 numbers
            </p>  
            <input 
                onChange={(e) => {setOtp(e.target.value)}}
                className="w-96 h-12 px-2 border border-1 border-blue-500 rounded-md mt-5 mb-2"
                placeholder="Enter The OTP "
                type="text" />

             <p className="text-red-800 mt-2">
                {error}
            </p>
           <div className="self-end">
                <button
                    onClick={resendOtp}   
                    className="bg-blue-600 rounded-md w-28 py-1 mr-2 text-white">
                    Resend OTP
                </button>
                 <button 
                    onClick={OTPCheck}   
                    className="bg-blue-600 rounded-md w-24 py-1 text-white">
                    Continue
                </button>
           </div>
        </div>
    )
}
