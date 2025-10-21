import {Axios} from "./Axios"

export default async function Get(URL, headers) {
    try {
        let res = await Axios.get(URL, headers)
        console.log(URL, res.data);
        return res.data
    } catch (error) {
        let Error = error.response.data.errors
        console.log(URL, Error);
        throw Error
    } 
}