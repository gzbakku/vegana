module.exports = {

  init:async ()=>{

    common.tell('checking you rust dev environment.');

    let apps = [
      {
        app:'rust',
        website:'https://www.rust-lang.org/tools/install',
        message:'please install and setup your rust enviorment and check if your regular projects are compiling beforehand continuing this setup because we dont check your rust env to be working.',
        command:'rustc --version'
      },
      {
        app:'cargo',
        website:'https://www.rust-lang.org/tools/install',
        message:'please verify you have installed rust correctly since cargo is generally gets installed with rust lang itself.',
        command:'cargo --version'
      },
      {
        app:'wasm-pack',
        website:'https://rustwasm.github.io/wasm-pack/installer/',
        message:'please install wasm-pack from the website given or anyhow you like we use it internally to compile wasm from rust.',
        command:'wasm-pack --version',
      },
      {
        app:'cargo-generate',
        website:'https://rustwasm.github.io/docs/book/game-of-life/setup.html',
        command:'cargo-generate --version',
        install:'cargo install cargo-generate',
        error:'failed to install cargo-generate, please install it manually if this problem persists.'
      }
    ];

    let working = true;
    for(let app of apps){
      let run = await check_app(app);
      if(!run){
        working = false;
        break;
      }
    }

    if(!working){
      return common.error('failed-config-wasm');
    } else {
      return true;
    }

  }

};

async function check_app(app){

  common.tell('checking : ' + app.app);

  const run = await cmd.run(app.command)
  .then(()=>{
    return true;
  })
  .catch((e)=>{
    common.error(e);
    return false;
  });

  if(run){return true;}

  if(app.install){
    const install = await cmd.run(app.install)
    .then(()=>{
      return true;
    })
    .catch((e)=>{
      common.error(e);
      return false;
    });
    if(!install){
      return common.error(app.error);
    } else {
      return true;
    }
  }

  common.info(app.message);
  common.info(app.website);
  return false;

}
