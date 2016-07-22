// Required Modules
var express    = require("express");
var bodyParser = require("body-parser");
var jwt        = require("jsonwebtoken");
var _ = require("lodash");

var app        = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Enable CORS specific headers

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.get("/api/brands", function(req, res){
    res.json([
        {id:1, name:"Apple"}
    ]);
});

//EXAMPLE only, hardcoded, plain password
var users = {
	'user': {name: 'user', 'password':'user', token:''},
	'admin':{name:'admin', password: 'admin', token:'' }
}

//BEWARE: Not best pratice, this must be passed via environment variable or config file
var JWT_SECRET = process.env.JWT_SECRET || "secrect";

function createToken(id){
	return jwt.sign(id, JWT_SECRET);
}

app.post('/api/authenticate', function(req, res) {
    console.log("auth ", req.body.username);

    var user = users[req.body.username];

    if (user && user.password == req.body.password) { 
        console.log("right user name and password");

       var jwt = createToken(user.name);
       user.token = jwt;

       res.json({
            type: true,
            data: user,
            token: jwt
        }); 
    } else {
        res.json({
            type: false,
            data: "Incorrect username/password"
        });    
        console.log("incorrect username/password")
    }
})

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    console.log(bearerHeader);

    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
    	console.log("Token failed");
        res.sendStatus(403);
    }
}

function ensureValidToken(req, res, next) {

	var matchingUser = _.find(users, function(u) { return u.token == req.token; });
	if (matchingUser) {
		console.log("token found");
		next();
	}
	else  {
		console.log("user not found");
		res.sendStatus(403)
	}
}

app.get('/api/products', ensureAuthorized, ensureValidToken, function(req, res) {
     res.json([
     		{name:'iPhone', brand:'Apple'},
     		{name:'Nexus', brand:'Google'}
     	])
});


process.on('uncaughtException', function(err) {
    console.log(err);
});

var port = 7070;
// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});
