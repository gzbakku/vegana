const chalk = require('chalk');

module.exports = {

  error : function(error){
    console.log(chalk.red('!!! ' + error));
    return false;
  },

  tell : function(message){
    console.log(chalk.cyanBright('>>> ' + message));
    return true;
  }

};
