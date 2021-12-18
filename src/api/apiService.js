//import backendStore from './backendStore'
import Cookies from 'utils/Cookies'
import axios from 'axios';

const CONFIG = {
    url: process.env.REACT_APP_BACKEND_API,
    appName: process.env.REACT_APP_NAME || '',
    clientId: process.env.REACT_APP_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_CLIENT_SECRET || '',
    token: process.env.REACT_APP_CLIENT_TOKEN || ''
};

function getBearerToken() {
    // return localStorage.getItem('token');
    if (CONFIG.token !== '')
        return CONFIG.token
    else
        return Cookies.getCookie('token');
}

function setBearerToken(token) {
    localStorage.setItem('token', token);
}


export default class apiService {

    static async find(entity, filter) {
        const filterVars = filter && filter.length > 0 ? `?${filter}` : '';
        return await getContent(`${entity}${filterVars}`);
    }

    static async noAuthInsert(entity, postData) {
        const result = fetch(CONFIG.url + `/${entity}`, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers:{
                'Content-Type': 'application/json'
                //'Authorization': 'Bearer ' + CONFIG.token
            }
            })
            .then( (response) => response.json())
            .then(res => {
                return res
            })
            .catch(error => {
                return { error }
            })

        return result
    }
}

export async function getUserData(id) {
    const json = await getContent(`content/user/${id}`);

    return parseUser(json);
}

function parseUser(response) {
    return {
        _id: response._id,
        username: response.username,
        lastName: response.lastname,
        firstName: response.firstname,
        department: response.department,
        email: response.email,
        created: response.createdAt,
    };
}


export function getContent(url) {
    return getContentInternal(url, true);
}

async function getContentInternal(url, retry) {
    // Fetch the bearer token.
    //const token = await fetchBearerToken();

    try {
        const response = await axios.get(
            buildUrl(url)
            // headers: {
            //     'Accept': 'application/json',
            //     'Authorization': `Bearer ${token}`
            // }
        );

        if (response) {
        console.log("-> response", response);
            // if (response.status === 403 || response.status === 401) {
            //     // If we get an error we clear the bearer token and retry the request.
            //     clearBearerToken();

            //     if (retry) {
            //         return getContentInternal(url);
            //     }
            // }

            // throw new Error(`Failed to retrieve content, got ${response.statusText}`);
        }

        return await response.data;
    }
    catch (error) {
        throw new Error(`Failed to retrieve content, got ${error}`);
    }
}

function buildUrl(url) {
    if (url.length > 0 && url.startsWith('/')) {
        url = url.substr(1);
    }

    const result = `${CONFIG.url}/${url}`;

    return result;
}