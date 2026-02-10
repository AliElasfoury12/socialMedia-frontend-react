import PropTypes from 'prop-types'
import { EmailInput, PasswordInput } from '../Form/Inputs'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export default function LoginForm ({handleChange, handleSubmit, Errors}) {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)

    return (
        <form 
            onChange={handleChange}
            onSubmit={(e) => handleSubmit(e)}
            className="form">
            {EmailInput(Errors)}
            {PasswordInput(Errors, showPassword, () => dispatch(setShowPassword(!showPassword)))}
            <button 
                className="bg-blue-500 text-white w-96 py-1 rounded-lg" 
                type="submit" >
                    Login
            </button>
        </form> 
    )
}

LoginForm.propTypes = {
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    Errors: PropTypes.object
}