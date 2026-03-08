const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  
    const parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'application/json');

   
    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        if (parsedUrl.query.message === 'hi') {
            res.end(JSON.stringify({ msg: "Hello, How are you?" }));
        } else {
            res.end(JSON.stringify({ msg: "Hello" }));
        }
    }

   
    else if (req.method === 'POST' && parsedUrl.pathname === '/api/sayhi') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const data = JSON.parse(body);
            res.end(JSON.stringify({ msg: `Hello ${data.name}, How are you?` }));
        });
    }
});


server.listen(9818, () => {
    console.log('Server is running on http://localhost:9818');
});