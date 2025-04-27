class API {
    baseURL
    token
    
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

    GET(URL, headers = {}) {
        return this.request(URL, 'GET', '', headers)
    }
    
    POST(URL, body,  headers = {}) {
        return this.request(URL, 'POST', body, headers)
    }
    
    PUT(URL, body,  headers = {}) {
        return this.request(URL, 'PUT', body, headers)
    }
    
    DELETE(URL, headers = {}) {
        return this.request(URL, 'DELETE', '', headers)
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

