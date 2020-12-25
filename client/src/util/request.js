import axios from "axios";
// 从本地缓存中获取token

export default function () {
    let token = localStorage.getItem('token');
    let instance = axios;
    // 如果token存在，需要加上请求头
    if (token) {
        instance = axios.create({
            baseURL: 'http://localhost:3000',
            timeout: '3000 * 1000',
            headers: {
                'Authorization': 'bearer ' + token
            }
        })
    }
    // 请求拦截
    instance.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // 响应拦截
    instance.interceptors.response.use(function (response) {
       // 如果存在token, 把token, 存入缓存
        const token =  response.headers && response.headers.authorization;
        if (token){
            localStorage.setItem('token', token);
        }
        return response.data;
    }, function (error) {
     // 如果响应没有权限，401，清除token
        if (error.response.status === 401){
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    });

    return instance;
}

