import {Axios} from "./Axios"

export default async function Put(URL, form) {
    try {
        let res = await Axios.put(URL, form)
        console.log(URL, res.data);
        return res.data
    } catch (error) {
        let Error = error.response.data.errors
        console.log(URL, Error);
        throw Error
    }    
  }
