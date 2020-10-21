module.exports = {

  init:async ()=>{

    common.tell('installing electron via npm');

    const script = 'npm i -D electron@latest hadron-ipc electron-builder';
    const run = await cmd.run(script)
    .then(()=>{
      return true;
    })
    .catch((e)=>{
      common.error(e);
      return false;
    });

    if(!run){
      return common.error('failed-install-electron');
    } else {
      return true;
    }

  }

};
