const socket = io();

$(function(){
    //dom elemeent
   const $messageForm  =  $('#message-form')
   const $message      =  $('#message')
   const $chat         =  $('#chat')

   const $nickform      = $('#nick-form')
   const $nickname      = $('#nickname') 
   const $error         =  $('#error')
   const $nick = $('nick')

   const $username =  $('#username')
   //event
   $messageForm.submit((e)=>{
       e.preventDefault()
       socket.emit('send', $message.val())
       $message.val('')
   })

   socket.on('message', function(data){
        $chat.append('<strong>' + data.nick + '</strong>' + ': ' + data.msg )
   })

   $nickform.submit((e)=>{
       e.preventDefault();
       socket.emit('new user', $nickname.val(),(data)=>{
          if(data){
            $('#nick').hide()
            $('#contenendor-wrap').show()        
          }else{
             $error.html(`<div class="alert alert-danger"> that user already exist</div>`)
          }
          $nickname.val('')
       })
   })

   socket.on('usernames', data => {
    let html = '';
    for(i = 0; i < data.length; i++) {
      html += `<p><i class="fa fa-user"></i> ${data[i]}</p>`; 
    }
    $username.html(html);
  });
})