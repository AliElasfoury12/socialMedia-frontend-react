import { EyeIcon, EyeOffIcon } from "lucide-react"
import PropTypes from 'prop-types'

export default function ShowHidePassword({showPassword, setShowPassword, bottom}) {
    if(showPassword){ 
        return (
            <div className={`absolute bottom-[${bottom}rem] right-2`}>
                <EyeOffIcon onClick={() => setShowPassword(false)} className={`absolute bottom-[${bottom}rem] right-2`} />
            </div>
        )
    } 
    else {
        return (
            <EyeIcon onClick={() => setShowPassword(true)} className={`absolute bottom-[${bottom}rem] right-2`}/>
        )
    }
}

ShowHidePassword.propTypes = {
    showPassword: PropTypes.bool,
    setShowPassword: PropTypes.func,
    bottom: PropTypes.number
}
