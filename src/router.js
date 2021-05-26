import Vue from "vue";
import Router from "vue-router";
//import axios from 'axios';

Vue.use(Router);

const vueRouter = new Router({
    $breadCrumbs: ['main'],
    mode: "hash",
    routes: [
        {
            path: '/mfa/setup/:userId/:token',
            name: 'setupMfa',
            meta: {
                title: "2FA初始化"
            },
            component: () => import("@/components/SetupMfa"),
            props: true,
        },


        {
            path: '/xterm/:token',
            name: 'xterm',
            meta: {
                title: "Xterm"
            },
            component: () => import("@/components/Xterm"),
            props: true,
        },
        {
            path: '/util/image-editor',
            name: 'utilImageEditor',
            meta: {
                title: "图片编辑器"
            },
            component: () => import("@/components/UtilImageEditor"),
        },
        {
            path: "/",
            name: "main",
            meta: {
                title: "Home"
            },

            component: () => import("@/components/Main"),
            //redirect: {name: 'sshList'},
            children: [

                {
                    path: "guacamole",
                    name: "guacamole",
                    meta: {
                        breads: [{name: 'main', title: '首页'}, {name: 'requisition', title: 'guacamole'}],
                        title: "guacamole"
                    },
                    component: () => import("@/components/GuacClient"),
                },


                {
                    path: "user",
                    name: "user",
                    meta: {
                        breads: [{name: 'main', title: '首页'}, {name: 'user', title: '用户列表'}],
                        title: "用户"
                    },
                    component: () => import("@/components/ListUser")
                },

                {
                    path: "asset",
                    name: "asset",
                    meta: {
                        breads: [{name: 'main', title: '首页'}, {name: 'asset', title: '资产列表'}],
                        title: "资产列表"
                    },
                    component: () => import("@/components/ListAsset")
                },

                {
                    path: "asset-user",
                    name: "assetUser",
                    meta: {
                        breads: [{name: 'main', title: '首页'}, {name: 'assetUser', title: '资产用户'}],
                        title: "资产用户"
                    },
                    component: () => import("@/components/ListAssetUser")
                },
                {
                    path: "ssh-session-log",
                    name: "sshSessionLog",
                    meta: {
                        breads: [{name: 'main', title: '首页'}, {name: 'sshSessionLog', title: '会话日志'}],
                        title: "会话日志"
                    },
                    component: () => import("@/components/ListSshSessionLog")
                },

                {
                    path: "script-exec",
                    name: "scriptExec",
                    meta: {
                        breads: [{name: 'main', title: '首页'}, {name: 'scriptExec', title: 'scriptExec'}],
                        title: "scriptExec"
                    },
                    component: () => import("@/components/ListScriptExec")
                },

                {
                    path: "hacknews",
                    name: "hacknews",
                    meta: {
                        breads: [{name: 'main', title: '首页'}, {name: 'hacknews', title: 'Hacknews'}],
                        title: "Hacknews"
                    },
                    component: () => import("@/components/ListHacknews")
                },
                {
                    path: "manage-account",
                    name: "manageAccount",
                    meta: {
                        breads: [{name: 'main', title: '首页'}, {name: 'manageAccount', title: '管理账号'}],
                        title: "管理账号"
                    },
                    component: () => import("@/components/ListManageAccount")
                },

            ]
        }
    ]
});


export default vueRouter;