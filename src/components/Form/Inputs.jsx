import { EyeIcon, EyeOffIcon } from "lucide-react"

export function NameInput (Errors) {
    const input_data = {
        label: 'Name',
        name: 'name',
        type: 'text',
        placeholder: 'Enter Your Name',
        Errors: Errors
    }
    return CustomInput(input_data)
}

export function EmailInput(Errors) {
    const input_data = {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'Enter Your Email',
        Errors: Errors
    }
    return CustomInput(input_data)
}

export function PasswordInput (Errors, showPassword, setShowPassword) {
    const input_data = {
        label: 'Password',
        name: 'password',
        showPassword: showPassword,
        setShowPassword: setShowPassword,
        placeholder: "Enter Your Password",
        Errors: Errors
    }
   return CustomePasswordInput(input_data)
}

export function PasswordConfirmInput(Errors, showPassword) {
    const input_data = {
        label: 'Password Confirmation',
        name: 'password_confirmation',
        type: showPassword ? "text":"password",
        placeholder: "Confirm Your Password",
        Errors: Errors
    }

    return CustomInput(input_data)
}

export function CustomInput (input_data) {
    const name = input_data.name
    return (
        <div>
            <label className='label'>{input_data.label}</label>
            <input type={input_data.type} name={name} placeholder={input_data.placeholder} className='input' />
            <p className="text-red-600">{input_data.Errors[name] && input_data.Errors[name][0]}</p>
        </div>
    )
}

export function CustomePasswordInput (input_data) {
    const showPassword = input_data.showPassword
    const Errors = input_data.Errors
    const name = input_data.name
    
    return(
        <div>
            <label className='label' >{input_data.label}</label>
            <div className="flex items-center gap-1">
                <input 
                    type={showPassword ? "text":"password"} 
                    name={name} 
                    placeholder="Enter Your Password" 
                    className='input' />
                <button 
                    type="button"
                    onClick={input_data.setShowPassword}>
                    {showPassword ? <EyeOffIcon/> : <EyeIcon/>}
                </button>
            </div>
            <p className="text-red-600">{Errors[name] && Errors[name][0]}</p>
        </div>  
    )
}