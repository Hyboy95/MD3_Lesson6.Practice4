const http = require('http');
const url = require('url');
const fs = require('fs');

const handlers = {};
handlers.products = function (req, res) {
    fs.readFile('./view/products.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}

handlers.users = function (req, res) {
    fs.readFile('./view/users.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}

handlers.notFound = function (req, res) {
    fs.readFile('./view/notfound.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}

const router = {
    'users': handlers.users,
    'products': handlers.products,
}

const server = http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true);
    let path = parsedUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
    chosenHandler(req, res);
});

server.listen(3000, function () {
    console.log('server running at http://localhost:3000 ')
});