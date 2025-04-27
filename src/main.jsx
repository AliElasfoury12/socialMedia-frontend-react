import ReactDOM from 'react-dom/client'
import './echo'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './stores/store.js'
import { base_url } from './stores/statices.js'
import App from './App.jsx'
import api from './components/API/APIMethods.js'

const apiURL = base_url + 'api/'
let token = localStorage.getItem('token') ?? ''

api.setBaseURL(apiURL)
api.setToken(token)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App/>
    </Provider>
)