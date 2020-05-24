module.exports = {
  lazy:lazy,
  recompile:recompile,
}

async function recompile(parents){

  common.tell("recompiling wasm module : " + parents.wasm);

  const cwd = process.cwd();
  let module_dir = cwd + '\\app\\wasm\\' + parents.wasm;
  let script = 'wasm-pack build ' + module_dir + ' --target no-modules --out-name index';

  const run = await cmd.run(script)
  .then(()=>{
    common.tell("wasm project compiled : " + parents.wasm);
    return true;
  }).catch((e)=>{
    console.log(e);
    return common.error("failed-wasm-pack-build");
  });

  if(!run){return false;}

  await io.dir.ensure(cwd + "\\js\\");
  await io.dir.ensure(cwd + "\\js\\wasm\\");
  await io.dir.ensure(cwd + "\\js\\wasm\\" + parents.wasm + "\\");

  //********************
  //copy wrapper

  let from = module_dir + "\\pkg\\index.js"
  let to = cwd + "\\js\\wasm\\" + parents.wasm + "\\wrapper.js";

  let read = await io.read(from);
  if(!read){
    return common.error("failed-read_wasm_wrapper-build");;
  }
  
  let custom_was_controller = parents.wasm + '_wasm_controller';
  read = read.replace("wasm_bindgen = Object.assign(init, __exports);",custom_was_controller +" = Object.assign(init, __exports);");
  read = read.replace("let wasm_bindgen;","let " + custom_was_controller + ";");

  let write = await io.write(to,read);
  if(!write){
    return common.error("failed-write_wasm_wrapper-build");;
  }

  //*******************
  //copy wasm

  from = module_dir + "\\pkg\\index_bg.wasm";
  to = cwd + "\\js\\wasm\\" + parents.wasm + "\\index.wasm";
  let do_copy_wasm = await io.copy(from,to);
  if(!do_copy_wasm){
    return common.error("failed-do_copy_wasm-build");
  }

  return true;

}

function lazy(locations){

  return recompile({wasm:locations.app});

}

async function wasm_old(parents){

  common.tell("compiling wasm project");

  const cwd = process.cwd();
  let app_dir = cwd + '\\app\\wasm\\' + parents.wasm;
  let out_dir = cwd + '\\js\\wasm\\' + parents.wasm;
  let script = 'wasm-pack build ' + app_dir + ' --out-dir ' + out_dir + ' --target web';

  const run = await cmd.run(script)
  .then(()=>{
    common.tell("wasm project compiled");
    return true;
  }).catch((e)=>{
    console.log(e);
    return common.error("failed-wasm-pack-build");
  });

  if(!run){return false;}

  //read file
  let file_path = out_dir + "\\" + parents.wasm + "_bg.js"
  let read = await io.read(file_path);
  if(!read){
    return common.error("failed-read-wasm_js_controller-compile_wasm_module");
  }

  let line = "import * as wasm from './" + parents.wasm + "_bg.wasm';";
  read = read.replace(line,"");

  let write = await io.write(file_path,read);
  if(!write){
    return common.error("failed-write-wasm_js_controller-compile_wasm_module");
  }

  return true;

}
