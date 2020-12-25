import {login, loginOut, whoAmI} from "../api/userApi";

export default {
    namespaced: true,
    state: {
        isLoading: false,
        data: null,
    },
    mutations: {
        // 设置是否正在加载
        setIsLoading(state, payload) {
            state.isLoading = payload;
        },
        // 设置用户数据
        setData(state, payload) {
            state.data = payload
        }
    },
    actions: {
        // 登录
        async login({commit}, {loginId, loginPwd}) {
            commit('setIsLoading', true);
            const r = await login(loginId, loginPwd)
            commit('setData', r);
            commit('setIsLoading', false);
            return r;
        },
        // 获取用户信息
        async whoAmI({commit}) {
            try {
                commit('setIsLoading', true);
                const r = await whoAmI();
                commit('setData', r);
                commit('setIsLoading', false);
                return r;
            } catch (err) {
                commit('setData', null);
                commit('setIsLoading', false);
            }
        },
        // 退出登录
        loginOut({commit}) {
            commit('setIsLoading', true);
            loginOut();
            commit('setData', null);
            commit('setIsLoading', false);
        }
    }
}
