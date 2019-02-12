const init = require('./engine/init/index');
const build = require('./engine/build/index');
const serve = require('./engine/serve/index');
const generate = require('./engine/generate/index');
const chalk = require('chalk');
const log = console.log;

let work = process.argv;

//console.log(work);

let location = work[1];
let func = work[2];


let bank = ['serve','build','generate','init','help'];

if(bank.indexOf(func) >= 0){

  if(func == 'serve'){
    return serve.init();
  }

  if(func == 'build'){
    return build.init();
  }

  if(func == 'generate'){
    return generate.init(work[3],work[4]);
  }

  if(func == 'init'){
    return init.init(work[3],location);
  }

  if(func == 'help'){
    log(chalk.white('vegana cli can do the following things :-'));
    log(chalk.greenBright('- init'));
    log(chalk.greenBright('- serve'));
    log(chalk.greenBright('- build'));
    log(chalk.greenBright('- generate'));
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
  return;
}

log(chalk.red('!!! unhandled_error'));