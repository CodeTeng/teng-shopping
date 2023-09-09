import request from "@/utils/request";

// 获取分类数据
export const getCategoryList = () => {
    return request.get('/category/list')
}
