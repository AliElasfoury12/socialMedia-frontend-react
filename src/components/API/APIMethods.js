const baseURL = 'http://127.0.0.1:8000/api/'
const token = localStorage.getItem('token')

function API (URL, method, body = '', headers = {}) {

    if (token) headers = {'Authorization':`Bearer ${token}`, ...headers}
    if(method === 'POST' || method === 'PUT') {
        headers = {'Content-Type': 'application/json', ...headers}
    }

    let options = {
        method: method,
        headers: headers
    }

    if(body) options.body = JSON.stringify(body)

    try {
        fetch(baseURL+URL, options)
        .then(res => {return res.json()})
        
    } catch (error) {
        console.log(error)
    }
}

export function GET(URL, headers = {}) {
    return API(URL, 'GET', '', headers)
}

export function POST(URL, body,  headers = {}) {
    return API(URL, 'POST', body, headers)
}

export function PUT(URL, body,  headers = {}) {
    return API(URL, 'PUT', body, headers)
}

export function DELETE(URL, headers = {}) {
    return API(URL, 'DELETE', '', headers)
}
