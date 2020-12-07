module.exports = {

  init: async ()=>{

    common.tell('initiating run cordova');

    const build_it = await build_api.init('',true);
    if(!build_it){
      return common.error('failed-build_app');
    }

    const run_copy = await copy_build_to_cordova.init();
    if(!run_copy){
      return common.error('failed-transfer_files');
    }

    common.tell("executing cordova commands");

    let do_run_cordova = await run_cordova();
    if(!run_cordova){
      return common.error('failed-run_cordova');
    }

  }

};

async function run_cordova(){
  let cordova_path = io.dir.cwd() + '/cordova';
  process.chdir(cordova_path);
  const run = await cmd.run("cordova run ");
  console.log(run);
}
