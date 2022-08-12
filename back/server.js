const http = require('http');

const server = http.createServer((req, res, next) => {
    res.end('Réponse server OK');
});

server.listen(process.env.PORT || 3000);