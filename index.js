
// console.log({isPrimary:});

// if(!require("cluster").isPrimary){return;}

const init = require('./engine/init/index');
const build = require('./engine/build/index');
const config = require('./engine/config/index');
const serve = require('./engine/serve/index');
const generate = require('./engine/generate/index');
const run = require('./engine/run/index');
const sass = require('./engine/sass/index');
const ui = require('./engine/ui/index');
const install = require('./engine/install/index');
const electron = require('./engine/electron/index');
const static = require('./engine/static/index');
const collect = require('./engine/collect/index');
const version = require('./engine/version');
const docs = require('./engine/docs/index');
const chalk = require('chalk');
global.uniqid = require("uniqid");
const log = console.log;

global.common = require('./common');
global.cmd = require('./cmd_mod');
global.io = require('./io');
global.build_api = require("./engine/build/web/index");
global.build_electron = require("./engine/electron/build/index");
global.config_electron = require("./engine/electron/config/index");
global.copy_build_to_cordova = require('./copy_build_to_cordova');
global.input = require('input');
global.check_vegana_directory = require("./check_vegana_directory");
global.html = require('./html');
global.sass_collect = ()=>{
  return sass.init("collect");
}
global.common_collect = collect.commonComp;
global.get_variable = get_variable;

starter();

async function starter(){

  let work = process.argv;
  let func = work[2];
  let bank = [
    'collect','static','serve','build','generate','init','help',
    'check','founder','config','run','sass','ui','electron',"docs",,"install",
    '--version','-version','-Version','--Version','version',"-V",'-v','--V','--v',"--help"
  ];

  if(bank.indexOf(func) < 0){
    func = await input.select("please select a valid function",bank);
    return run_cli(func,work,true,bank);
  } else {
    return run_cli(func,work,false,bank);
  }

}

function run_cli(func,work,is_outside,bank){

  let location = work[1];

  let version_tags = ['--version','-version','-Version','--Version','version',"-V",'-v','--V','--v'];

  if(func == 'serve'){
    return serve.init(work[3],work[4],is_outside);
  } else if(version_tags.indexOf(func) >= 0){
    return version.init();
  } else if(func === "docs"){
    return docs.init(work[3]);
  } else if(func === "collect"){
    return collect.init(work[3]);
  } else if(func == 'build'){
    return build.init(work[3],work[4]);
  } else if(func == 'run'){
    return run.init(work[3]);
  } else if(func == 'config'){
    return config.init(work[3]);
  } else if(func == 'generate'){
    return generate.init(work[3],work[4],work[5]);
  } else if(func == 'init'){
    return init.init(work[3],location);
  } else if(func == 'sass'){
    return sass.init(work[3],location);
  } else if(func == 'ui'){
    return ui.init(work[3],work[4],work[5]);
  } else if(func === "static"){
    return static.init(work[3],work[4],work[5]);
  } else if(func === "electron"){
    return electron.init(work[3],work[4],work[5]);
  } else if(func === "install"){
    return install.init(work[3],work[4],work[5]);
  } else if((func == 'help') || get_variable("help")){
    log(chalk.white('vegana cli can do the following things :-'));
    log(chalk.white('each command have there own sub help sections which will either guide you or give sub commands/actions.'));
    for(let item of bank){
      log(chalk.greenBright(`${item}`));
    }
    return;
  } else if(func == 'check'){
    return log(chalk.greenBright('Hey you got Vegana'));
  } else if(func == 'founder'){
    return log(chalk.greenBright('Akku - Tejasav Dutt, you can found me at gzbakku@gmail.com'));
  }

}

function get_variable(name){
  let args = process.argv;
  for(let item of args){
    if(item.indexOf(name) >= 0){
      if(item.indexOf("=") >= 0){
        let value = item.split("=")[1];
        while(value.indexOf(`"`) >= 0){
          value = value.replace(`"`,"");
        }
        while(value.indexOf(`'`) >= 0){
          value = value.replace(`'`,"");
        }
        return value;
      } else {
        return true;
      }
    }
  }
  return false;
}
