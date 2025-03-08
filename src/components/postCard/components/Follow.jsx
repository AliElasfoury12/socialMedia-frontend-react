import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { follow } from '../../../stores/profileStore'
import { followPostUser } from '../../../stores/postsStore'

export default function Follow({id, follows, ClassName}) {
    let dispatch = useDispatch()
    let { authUser } = useSelector(state => state.auth)

    let handleFollow = () => {
        dispatch(follow(id))
        .then((data) => {
            dispatch(followPostUser({id, follows: data.payload.follows}))
        })   
    }
  
    return (
        <div>
            { authUser.id != id &&
                <button 
                    onClick={handleFollow}
                    className={ClassName}>
                        {follows ? 'Following' : ' Follow'}
                </button> 
            }
        </div>
    )
}

Follow.propTypes = {
    id: PropTypes.number,
    follows: PropTypes.number,
    ClassName:  PropTypes.string
}