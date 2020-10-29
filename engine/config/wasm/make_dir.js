module.exports = async ()=>{

  let wasmDir = io.dir.cwd() + '/app/wasm/';

  if(await io.exists(wasmDir)){
    common.tell("wasm directory already exists");
    return true;
  }

  let create = await io.dir.ensure(wasmDir)
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
