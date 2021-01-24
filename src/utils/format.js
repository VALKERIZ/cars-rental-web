// 格式化汽车属性
export function formatCarsAttr(val) {
    if (!val) {
        return "";
    }
    return JSON.parse(val);
}

// 获取指定属性的key的值
export function getCarsAttrKey(params) {
    if (!params.data) {
        return "";
    }
    // 格式化汽车属性数据
    const data = formatCarsAttr(params.data);
    // 判断数据，并返回
    if (data[params.parentKey] && data[params.parentKey][params.childKey]) {
        // console.log("type", data, data[params.parentKey][params.childKey]);
        return data[params.parentKey][params.childKey];
    }
    return "";
}