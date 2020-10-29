// const fs = require('fs-extra');
const sass = require('node-sass');
// const common = require('../../common');

module.exports = {

  render:render,

  init:function(){

      common.tell('master sass compiler started');

      let currentDirectory = io.dir.cwd() + '/sass/master.scss';
      let targetDirectory = io.dir.cwd() + '/css/master.css';

      //render master css
      return render(currentDirectory,targetDirectory)
      .then(()=>{
        return true;
      })
      .catch((error)=>{
        console.log(error);
        return false;
      });

  },
  compile:{

    master:function(){

      common.tell('compiling master.scss');

      let currentDirectory = io.dir.cwd() + '/sass/master.scss';
      let targetDirectory = io.dir.cwd() + '/css/master.css';

      //render master css
      return render(currentDirectory,targetDirectory)
      .then(()=>{
        return true;
      })
      .catch((error)=>{
        console.log(error);
        return false;
      });

    },

    lazyModule:function(name){

      common.tell('compiling lazy-sass');

      let currentDirectory = io.dir.cwd() + '/sass/' + name + '.scss';
      let targetDirectory = io.dir.cwd() + '/css/' + name + '.css';

      //render master css
      return render(currentDirectory,targetDirectory)
      .then(()=>{
        return true;
      })
      .catch((error)=>{
        console.log(error);
        return false;
      });

    }
  }
};

function render(read,write){

  return new Promise(async (resolve,reject)=>{

    let error;

    if(read == null || write == null){
      error = 'invalid-read/write||location';
      reject(error);
    }

    let worker = async function(error,result){
      if(error){
        console.log(error);
        reject(error);
      }
      const run = await io.write(write,result.css);
      if(run){resolve();} else {reject("failed-write_file");}
    }

    sass.render({file:read,outputStyle:'compressed'},worker);

  });
  //promise ends here

}
//render function ends here
