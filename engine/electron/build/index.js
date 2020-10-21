

module.exports = async (need_help)=>{

  common.tell("building electron");

  const path = io.dir.cwd() + '/electronBuild.js';
  if(!await io.exists(path)){
    return common.error("please run \"vegana electron config\" then continue to building you are missing some files.");
  }

  const script = 'node ' + path;
  const run = await cmd.run(script)
  .then(()=>{
    return true;
  })
  .catch((e)=>{
    common.error(e);
    return false;
  });

  if(!run){
    common.error("failed electron builder");
  }

  common.success("electron build successfull");

}
