

module.exports = {init:init};

async function init(){

  const from = io.dir.app() + "/_gitignore";
  const to = io.dir.cwd() + "/.gitignore";

  const do_copy = await io.copy(from,to);
  if(!do_copy){
    return false;
  }

  return common.success("git ignore file created");

}
