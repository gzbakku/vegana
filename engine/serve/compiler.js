const cmd = require('../../cmd');
const common = require('../../common');

async function init(){

  console.log('>>> compiling app');

  let runFile = {
    command : 'browserify',
    argv : [
      './compile.js',
      '-o',
      './js/bundle.js'
    ]
  };

  //console.log(toRun);

  let buildBundle = await cmd.runFile(runFile.command,runFile.argv)
  .then(()=>{
    //console.log('successfull');
    return true;
  })
  .catch((err)=>{
    console.log(err);
    return false;
  },(stderr)=>{
    console.log(stderr);
    return false;
  });

  //console.log(buildBundle);

  if(buildBundle == false){
    return common.error('broswerify_bundle failed');
  }

  return true;

}

module.exports = {
  init:init
};
