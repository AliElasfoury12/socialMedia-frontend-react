import PropTypes from 'prop-types'
import Delete from '../API/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../../stores/authStore'

let DeleteUser = (props) => {
  let {authUser} = useSelector(state => state.auth)
  let dispatch = useDispatch()

    function DeleteUser () {
        Delete('users/' + props.id)
        .then(() =>{
             if(authUser.id === props.id){
                dispatch( setToken(null))
             }
        })
     }  
    
   return(
      <button onClick={ DeleteUser}>Delete</button>
   )
}

DeleteUser.propTypes = {
   id: PropTypes.number,
}

export default DeleteUser