

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

    const install_eslint = await cmd.run('npm i @eslint/js')
    .then((stdout)=>{
      return true;
    })
    .catch((err)=>{
      return false;
    });

    if(install_eslint == false){
      return common.error('cannot_install @eslint/js');
    }

    const install_globals = await cmd.run('npm i globals')
    .then((stdout)=>{
      return true;
    })
    .catch((err)=>{
      return false;
    });

    if(install_globals == false){
      return common.error('cannot_install globals');
    }

    return true;

  }

};
