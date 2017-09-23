import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/components/Taobao/Index')
    },
    {
      path:"/order",
      name:"order",
      component: require("@/components/Taobao/GetOrder")
    },
    {
      path:"/test",
      name:"test",
      component: require("@/components/Taobao/testPost")
    },
    {
      path:"/cookie",
      name:"cookie",
      component: require("@/components/Taobao/CookieList")
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
