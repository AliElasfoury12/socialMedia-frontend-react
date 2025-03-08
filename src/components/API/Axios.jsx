import axios from "axios";

export let Axios = axios.create({
   baseURL: 'http://127.0.0.1:8001/api/'
}) 

Axios.interceptors.request.use((config) => {
   const token = localStorage.getItem('token')
   config.headers.Authorization = `Bearer ${token}`
   return config
})

/*
Axios.interceptors.response.use(
   (response) => {
      return response
   },
   (error) => {
      const {response} = error
      if(response.status === 401){
         localStorage.removeItem('token')
      } 
      throw error
   }
)
*/
