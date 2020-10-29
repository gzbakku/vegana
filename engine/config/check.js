async function init(){

  common.tell('checking app files');

  let currentDirectory = io.dir.cwd() + '/';
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
  let failed = [];

  for(var i=0;i<files.length;i++){
    let location = currentDirectory + files[i];
    let check = await io.exists(location);
    if(check == false){
      success = false;
      failed.push(files[i]);
    }
  }

  if(success == false){
    common.error(failed);
    return common.error('this doesnt look like vegana project to me');
  }

  return true;

}

module.exports = {init:init};
