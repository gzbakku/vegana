const build = require('./build/index');
const copy = require('./copy');

module.exports = {

  init: async ()=>{

    common.tell('initiating run cordova');

    const build_it = await build.init();
    if(!build_it){
      return common.error('failed-build_app');
    }

    const run_copy = await copy.init();
    if(!run_copy){
      return common.error('failed-transfer_files');
    }

    // common.tell('$ cordova run <platform>');
    // common.tell('please run the given command in the cordova directory.');

    common.tell("executing cordova commands");

    let do_run_cordova = await run_cordova();
    if(!run_cordova){
      return common.error('failed-run_cordova');
    }

  }

};

async function run_cordova(){
  let cordova_path = process.cwd() + '\\cordova';
  process.chdir(cordova_path);
  const run = await cmd.run("cordova run ");
  console.log(run);
}
