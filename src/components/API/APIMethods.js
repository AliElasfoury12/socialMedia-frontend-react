import { api } from "../../main"
export class API {

    constructor (baseURL, token) {
        this.baseURL = baseURL
        this.token = token
    }

   async request (URL, method, body = '', headers = {}) {

        if (this.token) headers = {'Authorization':`Bearer ${this.token}`, ...headers}
        if(method === 'POST' || method === 'PUT') {
            headers = {'Content-Type': 'application/json', ...headers}
        }
    
        let options = {
            method: method,
            headers: headers
        }
    
        if(body) options.body = JSON.stringify(body)
    
        let res = await fetch(this.baseURL+URL, options)
        let status = res.status
        res = await res.json()
        if( status !== 200) throw res
        else return res
    }
}

export function GET(URL, headers = {}) {
    return api.request(URL, 'GET', '', headers)
}

export function POST(URL, body,  headers = {}) {
    return api.request(URL, 'POST', body, headers)
}

export function PUT(URL, body,  headers = {}) {
    return api.request(URL, 'PUT', body, headers)
}

export function DELETE(URL, headers = {}) {
    return api.request(URL, 'DELETE', '', headers)
}
