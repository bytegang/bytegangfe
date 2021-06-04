import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
//import './assets/styles/index.scss' // global css
import VueI18n from 'vue-i18n'
import {messages} from "./libs/i18n";
import store from './store';
import VeCharts from 've-charts'
import {VuePlugin} from './libs/plugin'

Vue.use(VeCharts)
Vue.use(VuePlugin)
Vue.use(VueI18n);
Vue.use(ElementUI);

Vue.config.productionTip = false;

const i18n = new VueI18n({
    local: 'zh-CN', // 设置语言
    fallbackLocale: 'zh-CN',
    messages // 语言包
});
new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
