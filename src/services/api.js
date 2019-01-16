import axios from 'axios';

export const setTokenHeader = (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

//method: get/post/etc, path: api path, data: JSON
export const apiCall = (method, path, data) => {
    return new Promise((resolve, reject) => {
        return axios[method.toLowerCase()](path, data, {headers: {'Access-Control-Allow-Origin': '*'}})
            .then(res => {
                return resolve(res.data);
            })
            .catch(e => {
                return reject(e.response.data.error);
            })
    });
}