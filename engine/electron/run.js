module.exports = {

  init: async ()=>{

    common.tell('initiating run electron');

    cmd.run('electron electro.js')
    .catch((error)=>{
      common.error(error);
      common.error('failed run electron script');
      common.error('try $ electron electro.js in the command line');
    });

  }

};
