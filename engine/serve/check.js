async function init(){

  console.log('>>> checking app files');

  let currentDirectory = process.cwd() + '/';
  let files = [
    'index.html',
    'compile.js',
    'lazy.json',
    'css',
    'sass',
    'sass/master.scss',
    'js',
    'app',
    'app/index.js'
  ];

  let success = true;
  for(var i=0;i<files.length;i++){
    let location = currentDirectory + files[i];
    let check = await io.exists(location);
    if(!check){
      common.error("failed-file_not_found => " + location);
      success = false;
      break;
    }
  }

  if(success == false){
    return common.error('check app folder for the abset file location provided above');
  }

  return true;

}

module.exports = {init:init};
