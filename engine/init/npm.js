

module.exports = {

  init:async (projectDir)=>{

    process.chdir(projectDir);

    common.tell("configuring npm");

    const init_npm = await cmd.run('npm init -y')
    .then((stdout)=>{
      return true;
    })
    .catch((err)=>{
      return false;
    });
    if(init_npm == false){
      return common.error('npm_init failed');
    }

    common.tell('installing vegana-engine npm module');

    const install_vegana_engine = await cmd.run('npm i vegana-engine')
    .then((stdout)=>{
      return true;
    })
    .catch((err)=>{
      return false;
    });

    if(install_vegana_engine == false){
      return common.error('cannot_install vegana-engine');
    }

    common.tell('installing vegana-static npm module');

    const install_vegana_static = await cmd.run('npm i vegana-static')
    .then((stdout)=>{
      return true;
    })
    .catch((err)=>{
      return false;
    });

    if(install_vegana_static == false){
      return common.error('cannot_install vegana-static');
    }

    return true;

  }

};
