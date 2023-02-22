

module.exports = {

  init:async (projectDir)=>{

    process.chdir(projectDir);

    common.tell("configuring npm");

    const npmInit = await cmd.run('npm init -y')
    .then((stdout)=>{
      return true;
    })
    .catch((err)=>{
      return false;
    });
    if(npmInit == false){
      return common.error('npm_init failed');
    }

    common.tell('installing vegana-engine npm module');

    const installVeganaEngine = await cmd.run('npm i vegana-engine')
    .then((stdout)=>{
      return true;
    })
    .catch((err)=>{
      return false;
    });

    if(installVeganaEngine == false){
      return common.error('cannot_install vegana-engine');
    }

    return true;

  }

};
