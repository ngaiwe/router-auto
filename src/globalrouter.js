
function main(router) {
  router.beforeEach((to, from, next) => {
    console.log(to)
  })
}

export default main