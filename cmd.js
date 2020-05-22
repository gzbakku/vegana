const baseWorker = require('child_process');
const exec = baseWorker.exec;
const spawn = baseWorker.spawn;
const common = require('./common');
const cross = require('cross-spawn');

module.exports=  {

  run : function(cmd){

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

  },

  runFile : function(cmd,argv){

    return new Promise((resolve,reject)=>{

      if(cmd == null || cmd == undefined){
        reject('invalid_cmd');
      }
      if(argv == null || cmd == argv){
        reject('invalid_argvs');
      }

      let child = cross.sync(cmd, argv, { stdio: 'inherit' });

      if(child.stderr !== null){
        reject(child);
      }

      if(child.error !== null){
        reject(child);
      }

      resolve(child);

    });

  }

};
