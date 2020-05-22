const fs = require('fs-extra');

module.exports = async ()=>{

  let wasmDir = process.cwd() + '\\app\\wasm\\';

  if(fs.existsSync(wasmDir)){
    common.tell("wasm directory already exists");
    return true;
  }

  let create = await fs.mkdir(wasmDir)
  .then(()=>{
    common.tell("wasm directory created");
    return true;
  })
  .catch((err)=>{
    return common.error(err);
  });

  if(!create){
    return false;
  } else {
    return true;
  }

}
