import request from "../util/request";

/**
 * 延迟函数
 * @param number
 * @returns {Promise<unknown>}
 */
function delay(number = 2000) {
    return new Promise((resolve, reject) => {
        setTimeout(_ => {
            resolve();
        }, number)
    })
}

/**
 * 登录
 * @param loginId
 * @param loginPwd
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function login(loginId, loginPwd) {
    await delay();
    return await request().post('api/administrator/login', {loginId, loginPwd})
}

/**
 * 获取用户信息
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function whoAmI() {
    await delay();
    return await request().get('api/administrator/whoAmI');
}

/**
 * 退出登录
 */
export function loginOut() {
    localStorage.removeItem('token');
    setCookie('token', '', -1)
}

/**
 * 设置cookie
 * @param cname
 * @param cvalue
 * @param exdays
 */
function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
