import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { follow } from '../../../stores/profileStore'

export default function Follow({id, follows, ClassName}) {
    const dispatch = useDispatch()
    const { authUser } = useSelector(state => state.auth)
   
    return (
        <>
            { authUser.id != id &&
                <button 
                    onClick={() => dispatch(follow(id))}
                    className={ClassName}>
                        {follows ? 'Following' : ' Follow'}
                </button> 
            }
        </>
    )
}

Follow.propTypes = {
    id: PropTypes.number,
    follows: PropTypes.bool,
    ClassName:  PropTypes.string
}