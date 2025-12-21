import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//const server = 'http://127.0.0.1:8000/'
const server = 'http://localhost:8000/'
export const profileStorage = server + 'storage/profile/'
export const postsStorage = server + 'storage/posts/'
export const base_url = server + 'api/'

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)