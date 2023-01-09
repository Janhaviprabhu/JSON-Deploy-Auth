const jsonServer = require('json-server')
const auth = require('json-server-auth')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
server.db = router.db
// server.bind(router)

// const rules = auth.rewriter({
//   // Permission rules
//   users: 600,
//   messages: 640,
//   // Other rules
//   '/posts/:category': '/posts?category=:category',
// })

// You must apply the middlewares in the following order


server.use(middlewares)
server.use(auth)
// server.use(rules)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(jsonServer.bodyParser)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})


// Export the Server API
module.exports = server

// json-server-auth backend

