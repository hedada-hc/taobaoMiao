import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/components/Taobao/order/order')
    },
    {
      path:"/order",
      name:"order",
      component: require("@/components/Taobao/order/allOrder"),
      children: [
        {
          path: '/order/hezone',
          name: 'hezone-page',
          component: require('@/components/hezone')
        }
      ]
    },
    {
      path:"/order/waitpay",
      name:"waitpay",
      component: require("@/components/Taobao/order/waitPay")
    },
    {
      path:"/order/waitconfirm",
      name:"waitconfirm",
      component: require("@/components/Taobao/order/waitConfirm")
    },
    {
      path:"/order/waitsend",
      name:"waitsend",
      component: require("@/components/Taobao/order/waitSend")
    },
    {
      path:"/test",
      name:"test",
      component: require("@/components/Taobao/testPost")
    },
    {
      path:"/userlist",
      name:"userlist",
      component: require("@/components/Taobao/userList")
    },
    {
      path:"/config",
      name:"config",
      component: require("@/components/Taobao/config")
    },
    {
      path: '*',
      redirect: '/userlist'
    }
  ]
})
