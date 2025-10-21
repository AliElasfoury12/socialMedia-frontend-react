import {Axios} from "./Axios"

export default async function Post(URL, form, headers) {
    try {
        let res = await Axios.post(URL, form, headers)
        console.log(URL ,res.data);
        return res.data
    } catch (error) {
        let Error = error.response.data.errors
        console.log(URL, error.response);
        throw Error
    }    
}