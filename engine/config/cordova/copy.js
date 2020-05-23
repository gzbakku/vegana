module.exports = {init:init,copy_initiater:copy_initiater};

async function init(){

  common.tell('processing built files for cordova');

  const currentDirectory = process.cwd() + '\\';
  const dirs = [
    'js',
    'css',
    'assets'
  ];

  if(true){
    let control = true;
    for(let dir of dirs){
      let from = currentDirectory + 'build\\' + dir;
      let to = currentDirectory + 'cordova\\www\\' + dir;
      //console.log({from:from,to:to});
      let work = await io.copy(from,to);
      if(!work){
        common.error('failed-copy_dir-' + files[i]);
        control = false;
        break;
      }
    }
    if(!control){
      return false;
    }
  }

  if(true){
    let do_copy_initiater = await copy_initiater();
    if(!do_copy_initiater){
      return common.error("failed-generate_cordova_run_script");
    }
  }

  return true;

}

async function copy_initiater(){

  const scriptAddressRef = process.argv[1];
  const scriptMidPoint = scriptAddressRef.lastIndexOf('\\');
  const appDirectory = scriptAddressRef.substring(0,scriptMidPoint)  + '\\';
  const currentDirectory = process.cwd() + '\\';

  const bin_path = appDirectory + 'cordova\\run.js'
  const cordova_path = currentDirectory + 'cordova\\run.js';

  let do_copy = await io.copy(bin_path,cordova_path);
  if(!do_copy){
    return false;
  } else {
    return true;
  }

}
