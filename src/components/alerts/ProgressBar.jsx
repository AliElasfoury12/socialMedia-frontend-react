import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

export default function ProgressBar (props) {
    const [width, setWidth] = useState(props.width)

    const DecreaseWidth = (IntervalId) => {        
        setWidth(w => { 
            if(w <= 0) {
                clearInterval(IntervalId)
                return 0
            }
            return w-1
        })
    }

    useEffect(() => {
        const IntervalId = setInterval(() => {DecreaseWidth(IntervalId)},100)
        return () => clearInterval(IntervalId)
    },[])

    return (
        <div className='flex flex-col gap-5 w-96'>
            <div 
                style={{width: `${width}rem`}}
                className='h-3 bg-green-500 transition-all ease-linear'>
            </div>
        </div>
    )
}

ProgressBar.propTypes = {
    width: PropTypes.number
}