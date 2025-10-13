import { EyeIcon, EyeOffIcon } from "lucide-react"

export function NameInput (Errors, defaultValue) {
    const input_data = {
        label: 'Name',
        name: 'name',
        type: 'text',
        placeholder: 'Enter Your Name',
        Errors: Errors,
        defaultValue: defaultValue
    }
    return CustomInput(input_data)
}

export function EmailInput(Errors, defaultValue) {
    const input_data = {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'Enter Your Email',
        Errors: Errors,
        defaultValue: defaultValue ?? ''
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

export function TextArea (input_data) {
    const error = input_data.error
    return (
        <>
            <textarea 
                name={input_data.name}
                autoFocus
                defaultValue={input_data.defaultValue}
                className="resize-none h-40 focus:outline-none border-none p-2" 
                placeholder={input_data.placeholder}>
            </textarea>
            {error && <p className="text-red-700 m-auto">{error}</p> }
        </>
    )
}

export function CustomInput (input_data) {
    const name = input_data.name
    return (
        <div>
            <label className='label'>{input_data.label}</label>
            <input 
                type={input_data.type} 
                name={name} 
                placeholder={input_data.placeholder} 
                className='input' 
                defaultValue={input_data.defaultValue ?? ''} 
            />
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
                    autoComplete="new-password"
                    type={showPassword ? "text":"password"} 
                    name={name} 
                    placeholder={input_data.placeholder}
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

export function NewPasswordInput (Errors, showNewPassword, setShowNewPassword) {
    const input_data = {
        label: 'New Password',
        name: 'new_password',
        showPassword: showNewPassword,
        setShowPassword: setShowNewPassword,
        placeholder: "Enter New Password",
        Errors: Errors
    }
    return CustomePasswordInput(input_data)
}

export function NewPasswordConfirmInput(Errors, showNewPassword) {
    const input_data = {
        label: 'New Password Confirmation',
        name: 'new_password_confirmation',
        type: showNewPassword ? "text":"password",
        placeholder: "Confirm Your New Password",
        Errors: Errors
    }

    return CustomInput(input_data)
}

export function CustomeEmailInput(data) {
    const input_data = {
        label: data.label,
        name: 'email',
        type: 'email',
        placeholder: 'Enter Your Email',
        Errors: data.Errors ?? {},
        defaultValue: data.defaultValue ?? ''
    }
    return CustomInput(input_data)
}
