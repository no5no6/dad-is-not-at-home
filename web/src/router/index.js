import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';
import Index from '@/views/Index';
import Login from '@/views/Login';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '/',
          name: '首页',
          component: Index
        },
        {
          path: '/',
          name: '登录',
          component: Login
        }
      ]
    }
  ]
})
