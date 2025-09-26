import ReactDOM from 'react-dom/client'
import './echo.js'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './stores/store.js'
import { base_url } from './stores/statices.js'
import App from './App.jsx'
import {api} from './components/API/APIMethods.js'
import { storage } from './utils/storage.js'

api.setBaseURL(base_url + 'api/')
api.setToken(storage.get('token') ?? '')

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App/>
    </Provider>
)