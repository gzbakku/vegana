module.exports = {
  files:files,
  make_directories:make_directories
};

async function files(){

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
    let to = currentDirectory + 'build/static/' + file;
    let work = await io.copy(from,to);
    if(!work){
      common.error('failed-process_built_for-' + file);
      control = false;
      break;
    }
  }

  if(!control){
    return common.error("failed generate optimized files.");
  }

  return common.success('optimized files generated');

}

async function make_directories(){

  common.tell('making build folders');

  let currentDirectory = io.dir.cwd() + '/';

  let files = [
    'build/static',
    'build/static/js',
    'build/static/assets',
    'build/static/css'
  ];

  for(var i=0;i<files.length;i++){
    await io.dir.ensure(currentDirectory + files[i]);
  }

  return common.success('directories generated');

}
