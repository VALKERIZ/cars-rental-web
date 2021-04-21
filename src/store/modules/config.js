const state = {
    message_item: {
        check_real_name: {
            msg: "您未实名认证，请先实名认证",
            router: "Authentication",
            type: "identity",
        },
        check_cars: {
            msg: "您未上传驾驶证，请先上传驾驶证，进行审核",
            router: "Authentication",
            type: "drive",
        },
        gilding: {
            msg: "您缴纳的押金少于1500元，请先缴纳足够的押金哦",
            router: "Recharge",
            type: "gilding",
        },
        illegalAmount: {
            msg: "您的预缴违章金额小于200元，请先预缴违章金额",
            router: "Recharge",
            type: "illegal",
        },
        blank: {
            msg: "您还没绑定过银行卡，请先绑定银行卡",
            router: "Bank",
        },
        subscribe: {
            msg: "您已预约了其他车辆，请勿再次预约",
        },
    },
    // 车辆状态
    cars_status: {
        WAIT: {
            zh: "待取车",
        },
        OVERTIME: {
            zh: "超时",
        },
        OVER: {
            zh: "完成",
        },
        CANCEL: {
            zh: "取消",
        },
        RETURN: {
            zh: "待还车",
        },
    },
    // 订单状态
    order_status: {
        WAIT: {
            zh: "已预约，取车",
        },
        OVER: {
            zh: "请选择车辆",
        },
        RETURN: {
            zh: "还车",
        },
    },
};
const getters = {};
const mutations = {};
const actions = {};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};