const build = require('./build/index');
const copy = require('./copy');
const currentDirectory = process.cwd() + '\\';

module.exports = {

  init: async ()=>{

    console.log('>>> initiating run cordova');

    const build_it = await build.init();
    if(!build_it){
      return common.error('failed-build_app');
    }

    const run_copy = await copy.init();
    if(!run_copy){
      return common.error('failed-transfer_files');
    }

    common.tell('$ cordova run <platform>');
    common.tell('please run the given command in the cordova directory.');

  }

};
