

module.exports = {
  init:async()=>{

    let package_path = await io.dir.app_dir();
    package_path += "/package.json"

    if(!io.exists(package_path)){
      return common.error("failed to access npm package.json file in " + package_path);
    }

    const read = await io.readJson(package_path);
    if(!read){
      return common.error("failed to read npm package.json file in " + package_path);
    }

    return common.success("vegana by gzbakku : " + read.version);

  }
};
