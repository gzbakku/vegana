module.exports = {init:init};

async function init(){

  common.tell('processing built files');

  let currentDirectory = io.dir.cwd() + '\\';

  let files = [
    'js',
    'css',
    'assets'
  ];

  let control = true;

  for(let file of files){
    let from = currentDirectory + file;
    let to = currentDirectory + 'build/web/' + file;
    let work = await io.copy(from,to);
    if(!work){
      common.error('failed-process_built_for-' + file);
      control = false;
      break;
    }
  }

  return control;

}
