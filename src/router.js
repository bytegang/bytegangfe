import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const vueRouter = new Router({
    $breadCrumbs: ['main'],
    mode: "history",
    routes: [

        {
            path: '/xterm/:token',
            name: 'xterm',
            meta: {
                title: "Xterm"
            },
            component: () => import("./components/Xterm"),
            props: true,
        },
        {
            path: "/play/:id",
            name: "play",
            meta: {
                breads: [{name: 'main', title: '首页'}, {name: 'play', title: 'Xterm播放器'}],
                title: "Xterm播放器"
            },
            props: true,
            component: () => import("./components/ViewTermPlayer")
        },
        {
            path: '/util/image-editor',
            name: 'utilImageEditor',
            meta: {
                title: "图片编辑器"
            },
            component: () => import("./components/UtilImageEditor"),
        },
        {
            path: "/",
            name: "main",
            meta: {
                title: "Home"
            },

            component: () => import("./components/Main"),
            //redirect: {name: 'sshList'},
            children: [





                {
                    path: "user",
                    name: "user",
                    meta: {
                        breads: [{name: 'main', title: '首页'}, {name: 'user', title: '用户列表'}],
                        title: "用户"
                    },
                    component: () => import("./components/ListUser")
                },

                {
                    path: "asset",
                    name: "asset",
                    meta: {
                        breads: [{name: 'main', title: '首页'}, {name: 'asset', title: '资产列表'}],
                        title: "资产列表"
                    },
                    component: () => import("./components/ListAsset")
                },


                {
                    path: "asset-user",
                    name: "assetUser",
                    meta: {
                        breads: [{name: 'main', title: '首页'}, {name: 'assetUser', title: '资产用户'}],
                        title: "资产用户"
                    },
                    component: () => import("./components/ListAssetUser")
                },
                {
                    path: "terminal-log",
                    name: "terminalLog",
                    meta: {
                        breads: [{name: 'main', title: '首页'}, {name: 'terminalLog', title: '会话日志'}],
                        title: "会话日志"
                    },
                    component: () => import("./components/ListTerminalLog")
                },

                {
                    path: "script-exec",
                    name: "scriptExec",
                    meta: {
                        breads: [{name: 'main', title: '首页'}, {name: 'scriptExec', title: '远程Shell脚本执行'}],
                        title: "远程Shell脚本执行"
                    },
                    component: () => import("./components/ListScriptExec")
                },

                {
                    path: "manage-account",
                    name: "manageAccount",
                    meta: {
                        breads: [{name: 'main', title: '首页'}, {name: 'manageAccount', title: '管理账号'}],
                        title: "管理账号"
                    },
                    component: () => import("./components/ListManageAccount")
                },

            ]
        }
    ]
});


export default vueRouter;