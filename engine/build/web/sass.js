const fs = require('fs-extra');
const sass = require('node-sass');

module.exports = {

  render:render,

  init:function(){

      console.log('>>> master sass compiler started');

      let currentDirectory = process.cwd() + '/sass/master.scss';
      let targetDirectory = process.cwd() + '/css/master.css';

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

      let currentDirectory = process.cwd() + '/sass/master.scss';
      let targetDirectory = process.cwd() + '/css/master.css';

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

      let currentDirectory = process.cwd() + '/sass/' + name + '.scss';
      let targetDirectory = process.cwd() + '/css/' + name + '.css';

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

    if(!await io.exists(read)){
      reject("file_not_found");
    }
    if(!await io.exists(write)){
      if(!await io.dir.ensure(get_base_dir(write))){
        reject("failed-make_write_directory");
      }
    }

    let error;

    if(read == null || write == null){
      error = 'invalid-read/write||location';
      reject(error);
    }

    let worker = function(error,result){

      // console.log(result);

      if(error){
        console.log(error);
        reject(error);
        return;
      }

      if(!result){
        reject("failed-compile");
        return;
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

    sass.render({file:read},worker);

  });
  //promise ends here

}
//render function ends here

function get_base_dir(path){
  let hold = io.clean_path(path).split("/");
  let collect = '';
  for(let i=0;i<hold.length-1;i++){
    collect += hold[i] + "/";
  }
  return collect;
}