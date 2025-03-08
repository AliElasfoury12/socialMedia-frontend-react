import ReactDOM from 'react-dom/client'
import './echo'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './stores/store.js'
import { RouterProvider } from 'react-router-dom'
import router from './Router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}>
        </RouterProvider>
    </Provider>
      
)


