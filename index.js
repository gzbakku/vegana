const init = require('./engine/init/index');
const build = require('./engine/build/index');
const config = require('./engine/config/index');
const serve = require('./engine/serve/index');
const generate = require('./engine/generate/index');
const run = require('./engine/run/index');
const sass = require('./engine/sass/index');
const ui = require('./engine/ui/index');
const chalk = require('chalk');
const log = console.log;

let work = process.argv;

//console.log(work);

let location = work[1];
let func = work[2];

global.common = require('./common');
global.cmd = require('./cmd_mod');
global.io = require('./io');
global.build_api = build;
global.copy_build_to_cordova = require('./copy_build_to_cordova');
global.input = require('input');

let bank = ['serve','build','generate','init','help','check','founder','config','run','sass','ui'];

if(bank.indexOf(func) >= 0){

  if(func == 'serve'){
    return serve.init(work[3],work[4]);
  }

  if(func == 'build'){
    return build.init(work[3]);
  }

  if(func == 'run'){
    return run.init(work[3]);
  }

  if(func == 'config'){
    return config.init(work[3]);
  }

  if(func == 'generate'){
    return generate.init(work[3],work[4],work[5]);
  }

  if(func == 'init'){
    return init.init(work[3],location);
  }

  if(func == 'sass'){
    return sass.init(work[3],location);
  }

  if(func == 'ui'){
    return ui.init(work[3],work[4],work[5]);
  }

  if(func == 'help'){
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
  }

  if(func == 'check'){
    log(chalk.greenBright('Hey you got Vegana'));
    return;
  }

  if(func == 'founder'){
    log(chalk.greenBright('Akku - Tejasav Dutt, you can found me at gzbakku@gmail.com'));
    return;
  }

}

if(bank.indexOf(func) < 0){
  log(chalk.red('!!! invalid argument'));
  log(chalk.red('vegana cli can do the following things :-'));
  log(chalk.yellow('- init'));
  log(chalk.yellow('- serve'));
  log(chalk.yellow('- build'));
  log(chalk.yellow('- generate'));
  log(chalk.yellow('- check'));
  log(chalk.yellow('- founder'));
  return;
}

log(chalk.red('!!! unhandled_error'));
