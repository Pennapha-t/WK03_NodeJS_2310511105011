const nreq = require('./lib/NReq')

// --------------------------------------------------------------------------
// 1. ทดสอบ GET แบบปกติ
nreq.request('GET', 'http', 'localhost', 9818, '/')

// 2. ทดสอบ GET แบบมี Query String ใน Path
nreq.request('GET', 'http', 'localhost', 9818, '/?message=hi')

// 3. ทดสอบ POST พร้อมส่ง Payload (Object)
nreq.request('POST', 'http', 'localhost', 9818, '/api/sayhi', { name: 'John' })

// 4. ทดสอบยิงไปที่ Server จริง (HTTPS พอร์ต 443)
nreq.request('GET', 'https', 'vercel-workshop-blush.vercel.app', 443, '/api/shop?item_id=10021')