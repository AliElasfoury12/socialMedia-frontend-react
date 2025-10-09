import { storage } from "../../utils/storage"

class API {
    baseURL
    token
    
    request (URL, method, body = '', headers = {}) {
        
        headers = {value: headers}

        body = this.headers(headers, method, body)
        
       const options = this.options(method, headers, body)
       
       return this.send_request(URL, options)
    }

    async send_request (URL, options) {
        let res = await fetch(this.baseURL+URL, options)
        const status = res.status
        res = await res.json()
        if(res.new_token) this.updateToken(res.new_token)

        if(status !== 200){
            console.log(URL, res);
            throw res
        }else {
            console.log(URL, res);
            return res
        }
    }

    updateToken (new_token) {
        this.token = new_token
        storage.save('token', new_token)
    }

    headers (headers, method, body) {
        if (this.token) headers.value = {'Authorization':`Bearer ${this.token}`, ...headers.value}
        
        if(method != 'GET') {
            if(!(body instanceof FormData)){
                headers.value = {'Content-Type': 'application/json', ...headers.value}
                return JSON.stringify(body)
            }
        }
        return body
    }

    options (method, headers, body) {
        const options = {
            method: method,
            headers: headers.value
        }
                
       if(body) options.body = body
       return options
    }

    GET(URL, headers = {}) {   
        return this.request(URL, 'GET', '', headers)
    }
    
    POST(URL, body,  headers = {}) {
        return this.request(URL, 'POST', body, headers)
    }
    
    PUT(URL, body,  headers = {}) {
        return this.request(URL, 'PUT', body, headers)
    }

    PATCH(URL, body,  headers = {}) {
        return this.request(URL, 'PATCH', body, headers)
    }
    
    DELETE(URL, body, headers = {}) {
        return this.request(URL, 'DELETE', body , headers)
    }

    setToken (token)
    {
        this.token = token;
    }

    setBaseURL (url)
    {
        this.baseURL = url
    }
}

export const api = new API;
export const Get    = (...params) => api.GET(...params)
export const Post   = (...params) => api.POST(...params)
export const Put    = (...params) => api.PUT(...params)
export const Patch  = (...params) => api.PATCH(...params)
export const Delete = (...params) => api.DELETE(...params)
