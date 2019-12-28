module.exports = (io)=>{

let nicknames = ['leo', 'pedro', 'joe']

    io.on('connection', (client)=> {
        console.log('socket connected')
        client.on('send', (data)=>{
           io.sockets.emit('message', {
               msg:data,
               nick:client.nickname
           })
        })

    client.on('new user', (data, cb)=>{
        console.log(data)
        if(nicknames.indexOf(data) != -1) {
           cb(false)
        }else{
            cb(true)
            client.nickname = data;
            nicknames.push(client.nickname)
            io.sockets.emit('usernames', nicknames)
        }
    })


            client.on('disconnect',data=>{
                if(!client.nickname){
                    return;
                }
                nicknames.splice(nicknames.indexOf(client.nickname), 1)
                io.sockets.emit('usernames', nicknames)
            })
        
    }) 

}