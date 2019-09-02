
  
import Vue from 'vue'
  
import Router from 'vue-router'
  
import helloworld from '@/page/helloworld/Index.vue'

import test from '@/page/test/Index.vue'

import test_test2 from '@/page/test/test2/Index.vue'
  
Vue.use(Router)
  
export default new Router({
    mode:'history',
    base:'/weiran/',
    routes:[{
      path: '/helloworld/index',
      name: 'helloworld',
      component: helloworld
    },{
      path: '/test/index',
      name: 'test',
      component: test
    },{
      path: '/test/test2/index',
      name: 'test_test2',
      component: test_test2
    }]
})
  