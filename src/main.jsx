import ReactDOM from 'react-dom/client'
import './echo'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './stores/store.js'
import { RouterProvider } from 'react-router-dom'
import router from './Router.jsx'
import { API } from './components/API/APIMethods.js'
const baseURL = 'http://127.0.0.1:8000/api/'
const token = localStorage.getItem('token') ?? ''

export let api = new API(baseURL, token);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}>
        </RouterProvider>
    </Provider>
)