import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import TimedAlert from "../alerts/TimedAlert"

export default function Test () {
   const [show, setShow] = useState()
   return (
    <div>
        <button onClick={() => setShow (true)}>
            click
        </button>
        <TimedAlert show={show} setShow={setShow}>
            alert
        </TimedAlert>
    </div>
   )
}

Test.propTypes = {
}