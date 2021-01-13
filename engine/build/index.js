const web = require('./web/index');
const cordova = require('./cordova/index');

async function init(platform,base){

  if(!platform){
    platform = await input.select("please select a module",['electron','cordova','web']);
  }

  common.tell('config initiated');

  //check the files

  let doCheck = await check_vegana_directory.init();
  if(doCheck == false){
    return common.error('check failed');
  }

  if(
    platform !== 'electron' &&
    platform !== 'cordova' &&
    platform !== 'web'
  ){
    common.error('please select a valid platform - electron/cordova/git/wasm');
    platform = await input.select("please select a module",['electron','cordova','wasm','git']);
  }

  if(platform === 'electron'){
    common.tell("please use the updated build api in the electron section => $$ \"vegana electron build\" $$");
    return build_electron();
  }
  if(platform === 'cordova'){
    return cordova.init();
  }
  if(platform === 'web'){
    common.info("base directory can also be provided in package.json as vegana_web_base_url key");
    return web.init(base);
  }

}

module.exports= {
  init:init
};
