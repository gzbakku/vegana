const server = require('http').createServer();
const io = require('socket.io')(server);
const common = require('../../common');
let run_cordova = false;
let run_electron = false;

let stdin;

module.exports = {

  init : function(do_run_cordova,do_run_electron){

    if(do_run_cordova){run_cordova = true;}
    if(do_run_electron){run_electron = true;}

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

  reload : ()=>{
    io.emit('reload','now');
    if((run_cordova || run_electron) && !stdin){
      stdin = process.openStdin();
      stdin.on('data',async (chunk)=>{
        if(run_cordova){start_cordova();}
        if(run_electron){
          if(typeof(global.start_electron) === "function"){
            await start_electron();
          }
        }
      });
    }
    return true;
  }

};

async function start_cordova_hold(){

  common.tell("building cordova");

  const do_build_api = await build_api.init();
  if(!do_build_api){
    return common.error("failed-do_build_api")
  }
  const do_copy_build_to_cordova = await copy_build_to_cordova.init();
  if(!do_copy_build_to_cordova){
    return common.error("failed-do_copy_build_to_cordova")
  }

  let path = process.cwd() + "/cordova/run.js";
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
  common.success("press enter to deploy to cordova platform");
}
