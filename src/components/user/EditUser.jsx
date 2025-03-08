import {  useState } from "react"
import Post from "../API/Post"
import { useSelector } from "react-redux"

function EditUser () {
  let authUser = useSelector(state => state.auth.authUser)

  const[name, setName] = useState(authUser.name)
  const[email, setEmail] = useState(authUser.email)
  const[img, setImg] = useState(null)
  const[nameError, setNameErorr] = useState('')
  const[emailError, setEmailErorr] = useState('')

  let formdata = new FormData
  formdata.append('_method', 'PUT')
  formdata.append('name', name)
  formdata.append('email', email)
  img ? formdata.append('img', img) : null
  formdata.append('password', '1234')


  let Edit = (e) => {
    e.preventDefault()
    Post('users/'+ authUser.id,formdata)
    .catch((error) => {
      error.email ? setEmailErorr(error.email[0]) : '';
      error.name ? setNameErorr(error.name[0]) : '';
    })
}

  return(
    <div>
      <form onSubmit={Edit} className="flex flex-col m-auto w-fit">
        <input type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)} />
        <p>{nameError}</p>
        <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <p>{emailError}</p>   
           <input className="" type="file"  onChange={e => setImg(e.target.files[0])}/>
        
        <button type="submit" >Edit</button>
      </form>
    </div>
  )
}

export default EditUser