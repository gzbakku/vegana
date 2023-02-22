

module.exports = {init:init};

async function init(){

  let from = await io.dir.app();
  from += "/_gitignore";
  const to = io.dir.cwd() + "/.gitignore";

  const do_copy = await io.copy(from,to);
  if(!do_copy){
    return false;
  }

  return common.success("git ignore file created");

}
