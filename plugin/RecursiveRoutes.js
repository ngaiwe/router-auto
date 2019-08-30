function recursiveRoutes (routes, tab, times) {
  let tabFirst = tab.repeat(times)
  let tabChildren = tab.repeat(times+1)
  let paths = routes.map(route => {
    return `\nimport ${route.name} from '${route.componentPath}'`
  })
  routes = routes.map(route => {
    return `{\n${tabChildren}path: '${route.path}',\n${tabChildren}name: '${route.name}',\n${tabChildren}component: ${route.name}\n${tabFirst}}`
  })
  return `
  \nimport Vue from 'vue'
  \nimport Router from 'vue-router'
  ${paths.join('\n')}
  \nVue.use(Router)
  \nexport default new Router({
    mode:'history',
    base:'/fx/',
    routes:[${routes.join(',')}]\n})
  `
}

module.exports = (routes, tab = '  ', times = 2) => recursiveRoutes(routes, tab, times)