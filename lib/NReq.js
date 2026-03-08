const http = require('http')
const https = require('https')

// ฟังก์ชันแปลง String เป็น JSON ตามสไตล์อาจารย์
function convertStringtoJSON(data) {
    try {
        return JSON.parse(data)
    } catch (excp) {
        return data
    }
}

// ฟังก์ชันหลักที่ส่งออกไปให้ไฟล์อื่นเรียกใช้
exports.request = (METHOD, PROTOCOL, HOST, PORT, PATH, PAYLOAD) => {
    
    // เลือก Module ให้ถูกตามโปรโตคอลที่ส่งมา
    const client = (PROTOCOL === 'https') ? https : http

    const options = {
        host: HOST,
        port: PORT,
        method: METHOD,
        path: PATH,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let req = client.request(options, (resp) => {
        let respdata = ``
        
        // รับข้อมูลที่ส่งกลับมาเป็น chunk
        resp.on(`data`, (chunk) => {
            respdata = respdata + chunk.toString()
        })

        // เมื่อรับข้อมูลเสร็จแล้ว ให้แปลงและแสดงผล
        resp.on(`end`, function () {
            console.log(convertStringtoJSON(respdata))
        })
    })

    // ถ้ามีการส่ง PAYLOAD มา (เช่นในกรณี POST) ให้แปลงเป็น String แล้วส่งไป
    if (PAYLOAD) {
        let payloadString = JSON.stringify(PAYLOAD)
        req.write(payloadString)
    }

    // สั่งจบ Request
    req.end()
}