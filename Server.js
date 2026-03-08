const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // แยก Path และ Query String ออกจากกัน
    const parsedUrl = url.parse(req.url, true);
    res.setHeader('Content-Type', 'application/json');

    // กรณี GET / หรือ GET /?message=hi
    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        if (parsedUrl.query.message === 'hi') {
            res.end(JSON.stringify({ msg: "Hello, How are you?" }));
        } else {
            res.end(JSON.stringify({ msg: "Hello" }));
        }
    }

    // กรณี POST /api/sayhi
    else if (req.method === 'POST' && parsedUrl.pathname === '/api/sayhi') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const data = JSON.parse(body);
            res.end(JSON.stringify({ msg: `Hello ${data.name}, How are you?` }));
        });
    }
});

// เปิด Port 9818 ตามโจทย์ของอาจารย์
server.listen(9818, () => {
    console.log('Server is running on http://localhost:9818');
});