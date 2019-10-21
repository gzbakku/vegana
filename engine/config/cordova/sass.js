const fs = require('fs-extra');
const sass = require('node-sass');

module.exports = {

  render:render,

  init:function(){

      common.tell('master sass compiler started');

      let currentDirectory = process.cwd() + '\\sass\\master.scss';
      let targetDirectory = process.cwd() + '\\css\\master.css';

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

      let currentDirectory = process.cwd() + '\\sass\\master.scss';
      let targetDirectory = process.cwd() + '\\css\\master.css';

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

      let currentDirectory = process.cwd() + '\\sass\\' + name + '.scss';
      let targetDirectory = process.cwd() + '\\css\\' + name + '.css';

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

  return new Promise((resolve,reject)=>{

    let error;

    if(read == null || write == null){
      error = 'invalid-read/write||location';
      reject(error);
    }

    let worker = function(error,result){

      if(error){
        console.log(error);
        reject(error);
      }

      fs.writeFile(write,result.css)
      .then(()=>{
        resolve();
      })
      .catch((err)=>{
        error = err;
        reject(error);
      });

    }

    sass.render({file:read,outputStyle:'compressed'},worker);

  });
  //promise ends here

}
//render function ends here
