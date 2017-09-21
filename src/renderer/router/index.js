import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'order',
      component: require('@/components/Taobao/getOrder')
    },
    {
      path:"/test",
      name:"test",
      component: require("@/components/Taobao/testPost")
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
