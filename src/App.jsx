import { RouterProvider } from 'react-router-dom'
import router from './Router.jsx'
import {api} from './components/API/APIMethods.js'
import { base_url } from './main.jsx'
import { Provider } from 'react-redux'
import { start_broadcasting } from './echo.js'
import { store } from './stores/store.js'

export default function App() {
    const { token } = store.getState().auth 
    api.setBaseURL(base_url)
    api.setToken(token)
    window.Echo = start_broadcasting(token)

    return (
        <>
            <Provider store={store}>
                <RouterProvider router={router}>
                </RouterProvider>
            </Provider>
        </>
    )
}
