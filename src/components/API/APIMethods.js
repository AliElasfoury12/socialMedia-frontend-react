import { storage } from "../../utils/storage"

class API {
    baseURL
    token
    headers = {}
    
    request (URL, method, body = '', headers = {}) {
        
        body = this.handleHeaders(headers, method, body)
        
        const options = this.options(method, body)
        
        const response = this.send_request(URL, options)

        this.headers = {}
        
        return response
    }

    async send_request (URL, options) {
        let res = await fetch(this.baseURL+URL, options)
        const ok = res.ok
        res = await res.json()
        if(res.new_token) this.updateToken(res.new_token)

        if(ok){
            console.log(URL, res);
            return res
        }else {
            console.log(URL, res);
            throw res
        }
    }

    updateToken (new_token) {
        this.token = new_token
        storage.save('token', new_token)
    }

    handleHeaders (headers, method, body) {
        if (this.token) this.addHeaders({Authorization:`Bearer ${this.token}`});
        
        if(method != 'GET') {
            if(!(body instanceof FormData)){
                this.addHeaders({'Content-Type': 'application/json'})
                return JSON.stringify(body)
            }
        }
        this.addHeaders(headers)
        return body
    }

    addHeaders (header) {
        this.headers = {...this.headers,...header}
    }

    options (method, body) {
        const options = {
            method: method,
            headers: this.headers,
            credentials: 'include'
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
