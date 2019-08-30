
  
import Vue from 'vue'
  
import Router from 'vue-router'
  
import helloworld from '@/page/helloworld/Index.vue'

import test from '@/page/test/Index.vue'
  
Vue.use(Router)
  
export default new Router({
    mode:'history',
    base:'/fx/',
    routes:[{
      path: '/helloworld/index',
      name: 'helloworld',
      component: helloworld
    },{
      path: '/test/index',
      name: 'test',
      component: test
    }]
})
  