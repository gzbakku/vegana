const init = require('./engine/init/index');
const build = require('./engine/build/index');
const config = require('./engine/config/index');
const serve = require('./engine/serve/index');
const generate = require('./engine/generate/index');
const run = require('./engine/run/index');
const sass = require('./engine/sass/index');
const ui = require('./engine/ui/index');
const electron = require('./engine/electron/index');
const chalk = require('chalk');
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

starter();

async function starter(){

  let work = process.argv;
  let func = work[2];
  let bank = ['serve','build','generate','init','help','check','founder','config','run','sass','ui','electron'];

  if(bank.indexOf(func) < 0){
    func = await input.select("please select a valid function",bank);
    return run_cli(func,work,true);
  } else {
    return run_cli(func,work,false);
  }

}

function run_cli(func,work,is_outside){

  let location = work[1];

  if(func == 'serve'){
    return serve.init(work[3],work[4],is_outside);
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
  } else if(func === "electron"){
    return electron.init(work[3],work[4],work[5]);
  } else if(func == 'help'){
    log(chalk.white('vegana cli can do the following things :-'));
    log(chalk.greenBright('- init'));
    log(chalk.greenBright('- check'));
    log(chalk.greenBright('- founder'));
    log(chalk.greenBright('- serve'));
    log(chalk.greenBright('- build'));
    log(chalk.greenBright('- generate'));
    log(chalk.greenBright('- config'));
    log(chalk.greenBright('- sass'));
    log(chalk.greenBright('- run'));
    return;
  } else if(func == 'check'){
    return log(chalk.greenBright('Hey you got Vegana'));
  } else if(func == 'founder'){
    return log(chalk.greenBright('Akku - Tejasav Dutt, you can found me at gzbakku@gmail.com'));
  }

}
