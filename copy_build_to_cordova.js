const io = require("./io");

module.exports = {init:init};

async function init(from_dev){

  common.tell('transferring built files');

  let currentDirectory = io.dir.cwd() + '/';

  let files = [
    'js',
    'css',
    'assets'
  ];

  let control = true;

  for(let file of files){

    let from = currentDirectory + 'build/web/' + file;
    if(from_dev){
      from = currentDirectory + '' + file;
    }

    let to = currentDirectory + 'cordova/www/' + file;

    if(file === "assets"){
      if(!await io.exists(to)){
        let work = await io.copy(from,to);
        if(!work){
          common.error(`failed-process_built_for-assets => ${from} => ${to}`);
          control = false;
          break;
        }
      } else {
        common.tell("COPY OF ASSETS TO CORDOVA IS BLOCKED");
      }
    } else {
      let work = await io.copy(from,to);
      if(!work){
        common.error(`failed-process_built_for => ${from} => ${to}`);
        control = false;
        break;
      }
    }

    // let from = currentDirectory + 'build/web/' + file;
    // let to = currentDirectory + 'cordova/www/' + file;
    // let work = await io.copy(from,to);
    // if(!work){
    //   common.error('failed-process_built_for-' + file);
    //   control = false;
    //   break;
    // }
  }

  return control;

}
