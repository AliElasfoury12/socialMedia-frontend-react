import PropTypes from 'prop-types'
import { Send } from 'lucide-react'

export default function SharePostButton ({setShow}) {
    return (
        <button
            onClick={() =>  setShow(true) }
            className='flex justify-center items-center bg-blue-500 w-28 h-7 rounded-full py-4'>
            <Send className='w-5 mr-2'/>
            <p>Share</p>
        </button>
    )
}

SharePostButton.propTypes = {
    setShow: PropTypes.func
}