const express = require('express')
const SocketIO = require('socket.io')
const http = require('http')
const app = express()
const path = require('path')

//configuracion
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile )


const server = http.createServer(app)
const io = SocketIO.listen(server)
require('./socket.js')(io)



app.use(require('./router/router.js'))

//stactic file
app.use(express.static(path.join(__dirname,'public')))

//start server
server.listen(app.get('port'), ()=>{
    console.log('server on port ', app.get('port'))
})


