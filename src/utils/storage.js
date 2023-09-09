const INFO_KEY = "teng_shopping_info"
const HISTORY_KEY = "teng_history_list"

// 获取个人信息
export const getUserInfo = () => {
    const result = localStorage.getItem(INFO_KEY)
    return result ? JSON.parse(result) : {
        token: '',
        userId: ''
    }
}

// 设置个人信息
export const setUserInfo = (userInfo) => {
    localStorage.setItem(INFO_KEY, JSON.stringify(userInfo))
}

// 移除个人信息
export const removeUserInfo = () => {
    localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史
export const getHistoryList = () => {
    const result = localStorage.getItem(HISTORY_KEY)
    return result ? JSON.parse(result) : []
}

// 设置搜索历史
export const setHistoryList = (arr) => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
