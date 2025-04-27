import { RouterProvider } from 'react-router-dom'
import router from './Router.jsx'

export default function App() {
    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    )
}
