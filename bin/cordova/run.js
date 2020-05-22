const baseWorker = require('child_process');
const exec = baseWorker.exec;
const spawn = baseWorker.spawn;

async function main(){

  let cordova_path = process.cwd() + '\\cordova';
  process.chdir(cordova_path);

  let run = await execute("cordova run");
  if(run){
    console.log(run);
  } else {
    console.error("execution failed");
  }

}

main();

function execute(cmd){

  return new Promise((resolve,reject)=>{

    if(cmd == null || cmd == undefined){
      reject('invalid_cmd');
    }

    exec(cmd,(err, stdout, stderr)=>{
      if(err){
        //console.log(err);
        reject(err);
      }
      if(stderr){
        // console.log('stderr');
        resolve(stderr);
      }
      if(stdout){
        //console.log(stdout);
        resolve(stdout);
      }
    });

  });

}
