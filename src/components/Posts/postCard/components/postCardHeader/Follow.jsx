import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import ShowIf from '../../../../Common/ShowIf'

export default function Follow({userId, follows, ClassName, followFunction}) {
    const { authUser } = useSelector(state => state.auth)
 
    return (
        <ShowIf show={authUser.id != userId}>
            <button 
                onClick={followFunction}
                className={ClassName}>
                {follows ? 'Following' : ' Follow'}
            </button> 
        </ShowIf>
    )
}

Follow.propTypes = {
    followFunction: PropTypes.func,
    userId: PropTypes.number,
    follows: PropTypes.bool,
    ClassName:  PropTypes.string
}