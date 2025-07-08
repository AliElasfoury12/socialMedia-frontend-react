//import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import './test.css'
import { getComments } from '../stores/commentStore'
import { useEffect } from 'react'

export default function Test () {
    const dispatch = useDispatch()

    useEffect(() => {dispatch(getComments())},[])
    return (
        <div>

        </div>
    )
}

// Test.propTypes = {
// }