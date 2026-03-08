const nreq = require('./lib/NReq')


nreq.request('GET', 'http', 'localhost', 9818, '/')


nreq.request('GET', 'http', 'localhost', 9818, '/?message=hi')


nreq.request('POST', 'http', 'localhost', 9818, '/api/sayhi', { name: 'John' })


nreq.request('GET', 'https', 'vercel-workshop-blush.vercel.app', 443, '/api/shop?item_id=10021')