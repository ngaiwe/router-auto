/**
 * 自动创建router
 * 问题 
 * 1.监听文件夹变动从而再次编译 ✅
 * 2.将router.js写入缓存 问题遗留
 *  - 在hooks对的emit中操作compilation.assets
 *  - assets中source为create创建文件 size为length
 *  - 将文件router.js加入assets中
 *  - 如何将router.js匹配到app.js中？❓
 * 3.增加子目录Index路由 ✅
 * 4.修改main.js引入关系 ✅
 * 5.增加router配置和修改锁死前缀fx
 * 6.增加路由配置项
 * 7.测试build
 */

const glob = require("glob")
const fs = require('fs')
const chokidar = require('chokidar');
const recursiveRoutes = require("./RecursiveRoutes.js")

class CreateRouter {
  constructor() {
    this.root = process.cwd()
    this.page = `${this.root}/src/page`
    this.compiler = null
    this.watchPage()
  }
  // plugin入口
  apply(compiler) {
    console.log('开始进入apply')
    this.compiler = compiler
    this.create()
    this.changeMain()
  }
  // 监听page下Index变化
  watchPage() {
    this.watcher = chokidar.watch(this.page, {
      ignored: !/.+Index.vue/,
      ignoreInitial: true, // 忽略add和unlink过程派发事件
      persistent: true // 是否在监听的时候继续进程
    });
    this.watcher
      .on('add', path => {
        console.log('新增文件', path)
        this.create()
      })
      .on('unlink', path => {
        console.log('删除文件', path)
        this.create()
      })
  }
  // 创建router.js
  // create2() {
  //   // let fs = this.compiler.outputFileSystem
  //   let values = this.getRouteNames(this.getFiles())
  //   let routes = values.map(value => this.addRoutes(value))
  //   let router = recursiveRoutes(routes)
  //   return router
  // }
  create() {
    let values = this.getRouteNames(this.getFiles())
    let routes = values.map(value => this.addRoutes(value))
    let router = recursiveRoutes(routes)
    fs.writeFileSync(`${this.root}/src/router.js`, router) // 需要写入内存
  }
  // 获取main.js文件内容
  getMain() {
    let entrys = Object.entries(this.compiler.options.entry),
      main = entrys[0][1].split('/')
    return fs.readFileSync(`${this.root}/src/${main[main.length-1]}`)
  }
  // 向main中注册router
  changeMain() {
    let content = this.getMain().toString(),
      mains = content.split('from'),
      index = mains.findIndex(main => main.indexOf('router') === -1 ? false : true)
    if (content.indexOf('@/router.js') == -1) {
      if (index == -1) {
        // 不存在
        mains[0] = `import router from '@/router.js'\n${mains[0]}`
        let key = mains.findIndex(main => main.indexOf('render') === -1 ? false : true)
        let els = mains[key].split('\n')
        let elKey = els.findIndex(main => main.indexOf('el') == -1 ? false : true)
        els.splice(elKey + 1, 0, "  router,")
        mains.splice(key, 1, els.join('\n'))
      } else {
        let router = mains[index + 1].split('\n')
        router.shift()
        router.unshift(` '@/router.js'`)
        router = router.join('\n')
        mains.splice(index + 1, 1, router)
      }
      fs.writeFileSync(`${this.root}/src/main.js`, mains.join('from'))
    } else {
      void null
    }
  }
  // 查找匹配路由文件
  getFiles() {
    return glob.sync(`${this.page}/**/Index.vue`)
  }
  // 匹配路由参数
  getRouteNames(value) {
    let reg = new RegExp(`${this.page}/(.+)/.+`, 'i')
    return value.map(item => {
      let _path = reg.exec(item)[1]
      let _name = _path.split('/').join('_')
      return {
        name: _name,
        path: _path
      }
    })
  }
  // 添加路由
  addRoutes(value) {
    let route = {
      name: `${value.name}`,
      path: `/${value.path}/index`,
      componentPath: `${this.page}/${value.path}/Index.vue`
    }
    return route
  }
}

module.exports = CreateRouter