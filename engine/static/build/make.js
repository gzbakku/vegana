
module.exports = {init:init};

async function init(){

  const cwd = await io.dir.cwd();
  const app_dir = await io.dir.app_dir();
  const build_dir = `${cwd}/build/static`;

  if(!await io.exists(build_dir)){
    return common.error(`build directory not found => ${build_dir}`);
  }

  io.dir.chdir(build_dir);
  
  const config_path_static = `${build_dir}/config.json`;
  if(!await io.exists(config_path_static)){
    const from = `${cwd}/static_server_config.json`;
    const to = config_path_static;
    if(!await io.copy(from,to)){
      return common.error(`failed copy static_server_config.json file => from : ${from} to : ${to}`);
    }
  }

  common.tell("config file generated successfully");

  let l;

  l = common.loading("initiating a npm package");

  if(!await cmd.run("npm init -y")){
    return common.error(`failed run command : npm init -y`);
  }

  l.stop();

  l = common.loading("installing vegana-static");

  if(!await cmd.run("npm i vegana-static")){
    return common.error(`failed run command : npm i vegana-static`);
  }

  l.stop();

  l = common.loading("generating index.js");

  const index_path = `${build_dir}/index.js`;
  if(!await io.exists(index_path)){
    let from = `${app_dir}/bin/static/dev.js`;
    if(!await io.copy(from,index_path)){
      return common.error("failed generate index.js for static build");
    }
  }

  l.stop();

  l = common.loading("configuring index.js");

  let read = await io.read(index_path);
  if(!read){
    return common.error(`failed read index.js => ${index_path}`);
  }

  read = read.replace("global.env = \"dev\";",`global.env = "prod";`);
  read = read.replace("./static_server_config.json","./config.json");

  l.stop();

  common.tell("updating index.js");

  if(!await io.write(index_path,read)){
    return common.error(`failed change env var from dev to prod in dex.js => ${index_path}`);
  }

  common.success("static configured successfully");

  return true;

}


