import Vue from "vue";
import VueRouter from "vue-router";
import index from "../views/index";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Index",
    component: index,
    children: [{
            path: "/user",
            name: "User",
            meta: {
                title: "用户中心",
            },
            component: () =>
                import ("../views/user/index"),
        },
        /**
         * 一.帐户
         */
        // 1.登录
        {
            path: "/login",
            name: "Login",
            meta: {
                title: "登录",
            },
            component: () =>
                import ("../views/account/login"),
        },
        // 2.注册
        {
            path: "/register",
            name: "Register",
            meta: {
                title: "注册",
            },
            component: () =>
                import ("../views/account/register"),
        },
        // 3.忘记密码
        {
            path: "/forget",
            name: "Forget",
            meta: {
                title: "忘记密码",
            },
            component: () =>
                import ("../views/account/forget"),
        },
        /**
         * 二.安全设置
         */
        //   1.首页
        {
            path: "/safe",
            name: "Safe",
            meta: {
                title: "安全设置",
            },
            component: () =>
                import ("../views/safe/index"),
        },
        // 2.重置密码
        {
            path: "/reset",
            name: "Reset",
            meta: {
                title: "重置密码",
            },
            component: () =>
                import ("../views/safe/reset"),
        },
    ],
}, ];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;