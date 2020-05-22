const server = require('http').createServer();
const io = require('socket.io')(server);
const common = require('../../common');
let run_cordova = false;

module.exports = {

  init : function(do_run_cordova){

    if(do_run_cordova){
      run_cordova = true;
    }

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
    if(run_cordova){
      start_cordova();
    }
    return true;
  }

};

async function start_cordova(){
  console.log("running coredova");
  let path = process.cwd() + "\\cordova\\run.js";
  let script = 'node ' + path;
  const run = await cmd.run(script)
  .then((data)=>{
    console.log(data);
  })
  .catch((error)=>{
    common.error(error);
    common.error('failed run cordova script');
    common.error('try `$ cordova run` in the cordova directory');
  });
}
