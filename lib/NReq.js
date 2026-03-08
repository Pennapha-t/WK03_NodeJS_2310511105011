const http = require('http')
const https = require('https')

function convertStringtoJSON(data) {
    try {
        return JSON.parse(data)
    } catch (excp) {
        return data
    }
}

exports.request = (METHOD, PROTOCOL, HOST, PORT, PATH, PAYLOAD) => {
    

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
        
        resp.on(`data`, (chunk) => {
            respdata = respdata + chunk.toString()
        })

  
        resp.on(`end`, function () {
            console.log(convertStringtoJSON(respdata))
        })
    })


    if (PAYLOAD) {
        let payloadString = JSON.stringify(PAYLOAD)
        req.write(payloadString)
    }

    
    req.end()
}