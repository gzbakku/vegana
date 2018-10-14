const server = require('http').createServer();
const io = require('socket.io')(server);
const common = require('../../common');

module.exports = {

  init : function(){

    console.log('>>> starting socket');

    io.on('connection',(client)=>{
      console.log('@@@ browser reloaded / connected');
      client.on('disconnect',()=>{
        console.log('!!! browser closed a connection');
      });
    });

    server.listen(7879);

    console.log('>>> vegana loader listening on port 7879');

    return true;

  },

  reload : function(){
    io.emit('reload','now');
    return true;
  }

};
