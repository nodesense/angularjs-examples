// server.js
var jsonServer = require('json-server')
var server = jsonServer.create()

var middlewares = jsonServer.defaults()


server.get("/special-api", function(req, res){

  console.log(JSON.stringify(req.headers));

  if (req.headers['x-special-token'] === 'SPECIAL-1234'){
    console.log("Trusted Request");
    res.json({result: true});
    return;
  }

  console.log("Invalid Request, no X-Special-Token found");
  //res.status(403);
  res.json({result:false});
})


server.use(middlewares)


server.get('/delayed-api/products', function(req, res){
  var handle = setInterval(function() {
    res.json([
      {name: 'iPhone', brand:'Apple', id:0},
      {name: 'Nexus', brand:'Google', id:2},
    ])

    clearInterval(handle);
  }, 10000);
})


server.get('/delayed-api/brands', function(req, res){
  var handle =  setInterval(function() {
      res.json([
        {name: 'Apple', email:'support@apple.com', id:0},
        {name: 'Google', brand:'support@google.com', id:2},
      ])

      clearInterval(handle);
   }, 3000);
})

// Add this before server.use(router)
server.use(jsonServer.rewriter({
  '/api/products': '/api/products/products',
  '/api/brands': '/api/brands/brands',
  '/api/cities': '/api/cities/cities',
  '/api/users': '/api/users/users',
}))

var router = jsonServer.router('data/products.json')
server.use('/api/products', router)
 
var router = jsonServer.router('data/brands.json')
server.use('/api/brands', router)

var router = jsonServer.router('data/cities.json')
server.use('/api/cities', router)

var router = jsonServer.router('data/users.json')
server.use('/api/users', router)


server.listen(3000, function () {
  console.log('JSON Server is running on port 3000')
})