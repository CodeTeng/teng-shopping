import {setUserInfo, getUserInfo} from "@/utils/storage";

export default {
    namespaced: true,
    state() {
        return {
            // 个人权限相关
            userInfo: getUserInfo()
        }
    },
    mutations: {
        setUserInfo(state, obj) {
            state.userInfo = obj
            setUserInfo(obj)
        }
    },
    actions: {},
    getters: {

    }
}
