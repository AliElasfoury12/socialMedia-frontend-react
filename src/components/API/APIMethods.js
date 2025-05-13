
class API {
    baseURL
    token
    
   async request (URL, method, body = '', headers = {}) {

        if (this.token) headers = {'Authorization':`Bearer ${this.token}`, ...headers}
        
        if(method != 'GET') {
            if(body instanceof FormData ){
                headers = {...headers}
            }else{
                headers = {'Content-Type': 'application/json', ...headers}
                if(body) body = JSON.stringify(body)
            }
        }
    
        let options = {
            method: method,
            headers: headers
        }
                
       if(body) options.body = body

        let res = await fetch(this.baseURL+URL, options)
        let status = res.status
        res = await res.json()
        if( status !== 200){
            console.log(URL, res);
            throw res
        }else {
            console.log(URL, res);
            return res
        }
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

const api = new API;
export default api;

