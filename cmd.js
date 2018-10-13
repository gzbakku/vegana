const { exec } = require('child_process');
const common = require('./common');

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
          //console.log(stderr);
          reject(stderr);
        }
        if(stdout){
          //console.log(stdout);
          resolve(stdout);
        }
      });

    });

  }

};
