let axios = require('axios');
import {apiUrl} from '../constants';

exports.post = (endpoint, payload) => {
    const route = `${apiUrl}${endpoint}`
    return axios(route, {
        method: 'POST',
        responseType: 'json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        data: JSON.stringify(payload)
    }).then(response => {
        if (response && response.data) {
            return { status: 'success', data: response.data}
        } else {
            return { status: 'fail', data: {error: 'No response data from server'}}
        }
    }).catch(error => {
        console.log({postError: error})
        return { status: 'fail', data: {error}}
    })
}

exports.get = (endpoint, auth) => {
    const route = `${apiUrl}${endpoint}`;
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    if (auth) {
        headers['Authorization'] = `Bearer ${auth}`;
    }
    return axios(route, {
        method: 'GET',
        responseType: 'json',
        headers
    }).then(response => {
        return formatResults(response);
    }).catch(error => {
        return formatResults(null, error)
    });
}
exports.put = (endpoint, auth,payload) => {
    const route = `${apiUrl}${endpoint}`;
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    if (auth) {
        headers['Authorization'] = `Bearer ${auth}`;
    }
    return axios(route, {
        method: 'PUT',
        responseType: 'json',
        headers,
        data: JSON.stringify(payload)
    }).then(response => {
        return formatResults(response)
    }).catch(error => {
        return formatResults(null, error)
    })
}
exports._delete = (endpoint, auth, payload) => {
    const route = `${apiUrl}${endpoint}`;
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    let data = null; 
    if (auth) {
        headers['Authorization'] = `Bearer ${auth}`;
    }
    if (payload) {
        data = payload
    }
    return axios(route, {
        method: 'DELETE',
        responseType: 'json',
        headers,
        data
    }).then(response => {
        return formatResults(response)
    }).catch(error => {
        return formatResults(null, error)
    })
}
function formatResults(results, message) {
    if (results && results.data) {
        return {status: "success", data: results.data}
    } else {
        return {status: "fail", data: message}
    }
}