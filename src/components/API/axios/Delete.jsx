import {Axios} from "./Axios"

export default async function Delete(URL) {
    try {
        let res = await Axios.delete(URL)
        console.log(URL, res.data);
        return res.data
    } catch (error) {
        let Error = error.response.data.errors
        console.log(URL, Error);
        throw Error
    }    
  }