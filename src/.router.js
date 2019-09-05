
  
import Vue from 'vue'
  
import Router from 'vue-router'
  
import helloworld_eira from '@/page/helloworld/eira/Index.vue'

import helloworld from '@/page/helloworld/Index.vue'
  
Vue.use(Router)
  
export default new Router({
    mode:'history',
    base:'/weiran/',
    routes:[{
      path: '/helloworld/eira/index',
      name: 'helloworld_eira',
      component: helloworld_eira,
      meta:{title:'批改作业2'},access:['DFDT','ATPM']
    },{
      path: '/helloworld/index',
      name: 'helloworld',
      component: helloworld,
      meta:{title:'批改作业'},access:['DFDT','ATPM']
    }]
})
  