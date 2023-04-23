
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
global.dir = require("./dir");
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
global.tools = require("./tools");
global.get_var = get_var;

if(!global.useVeganaAsModule){
  starter();
}

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

module.exports = {
  tools:tools,
  serve:serve,
  build:build,
  get_var:get_var,
  dir:dir
};

async function get_var(
  argument_num,
  var_name,
  type,
  message,
  options,
  dir
){

  let args = process.argv;

  let val;
  if(!val && var_name){
    for(let item of args){
        if(var_name && (
          type === "flag" || type === "confirm"
        )){
          if(var_name === item){
            val = true;
          }
        } else
        if(item.indexOf(var_name) >= 0){
            val = item.replace(`${var_name}=`,'');
            break;
        }
    }
  }

  if(
      !val &&
      typeof(argument_num) === "number" && 
      args.length >= argument_num
  ){
      val = args[argument_num];
  }

  if(val){
      if(val.length >= 2){
          if(val[0] === "-" && val[1] === "-"){
              val = undefined;
          }
      }
  }

  if(!val){
      if((options instanceof Array) && options.length === 1){
          val = await input.confirm(`${message} : ${options[0]}`);
          if(!val){
              return common.error("invalid input type");
          } else {
              val = options[0];
          }
      } else if(options instanceof Array){
          val = await input.select(message,options);
      } else if(type === "string"){
          val = await input.text(message);
      } else if(type === "number"){
          let c = true;
          while(c){
              val = await input.text(message);
              if(!isNaN(val)){
                  val = Number(val);
                  c = false;
              }
          }
      } else if(type === "dir" && dir){
          val = await dir.select_dir(dir);
      } else if(type === "file" && dir){
          val = await dir.select_file(dir);
      } else if(type === "confirm"){
          val = await input.confirm(message);
      } else {
          if(['flag'].indexOf(type) < 0){
            return common.error("invalid input type");
          }
      }
  }

  if(type === "confirm" && (typeof(val) !== "boolean")){
    return common.error(`expected value to be a boolean => ${message}`);
  }
  if(type === "string" && (options instanceof Array) && options.length > 0){
      if(options.indexOf(val) < 0){
          return common.error("invalid option");
      }
  }
  if(type === "number" && typeof(val) !== 'number'){
      return common.error("expected a number");
  }

  if((type === "confirm" || type === "flag") && (typeof(val) === "boolean")){
    return {result:val};
  }
  return val;

}
