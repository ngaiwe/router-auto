import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/page/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/router/',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
