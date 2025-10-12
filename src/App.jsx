import { RouterProvider } from 'react-router-dom'
import router from './Router.jsx'
import {api} from './components/API/APIMethods.js'
import { base_url } from './stores/statices.js'
import { useSelector } from 'react-redux'

export default function App() {
    const { token, window_echo } = useSelector(state => state.auth) 
    window.Echo = window_echo
    api.setBaseURL(base_url + 'api/')
    api.setToken(token)
    return (<RouterProvider router={router}/>)
}
