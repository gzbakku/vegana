module.exports = {

  init:async ()=>{

    common.tell('installing electron via npm');

    const base_script = 'npm i hadron-ipc';
    const base_run = await cmd.run(base_script)
    .then(()=>{
      return true;
    })
    .catch((e)=>{
      common.error(e);
      return false;
    });

    if(!base_run){
      return common.error("failed npm install hadron-ipc");
    }

    const dev_script = 'npm i -D electron@latest electron-builder';
    const dev_run = await cmd.run(dev_script)
    .then(()=>{
      return true;
    })
    .catch((e)=>{
      common.error(e);
      return false;
    });

    if(!dev_script){
      return common.error('failed npm install electron electron-builder');
    }

    return true;

  }

};
