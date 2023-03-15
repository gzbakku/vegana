const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;

module.exports = {

  loading:(m)=>{
    var spinner = new Spinner(`%s : ${chalk.cyanBright(m)}`);
    spinner.setSpinnerString('|/-\\');
    spinner.start();
    return {
      stop:()=>{
        spinner.stop();
      }
    };
  },

  error : function(error,log){
    if(log === false){return false;}
    console.log(chalk.red('!!! ' + error));
    return false;
  },

  tell : function(message){
    console.log(chalk.cyanBright('>>> ' + message));
    return true;
  },

  info : function(message){
    console.log(chalk.blue('??? ' + message));
    return true;
  },

  success : function(message){
    console.log(chalk.greenBright('@@@ ' + message));
    return true;
  },

  log:this.tell,

  time:()=>{
    return new Date().getTime();
  }

};
