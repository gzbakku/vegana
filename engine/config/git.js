

module.exports = {init:init};

async function init(){

  const scriptAddressRef = process.argv[1];
  const scriptMidPoint = scriptAddressRef.lastIndexOf('\\');
  const appDirectory = scriptAddressRef.substring(0,scriptMidPoint)  + '\\';
  const currentDirectory = process.cwd() + '\\';

  const from = appDirectory + ".gitignore";
  const to = currentDirectory + ".gitignore";

  const do_copy = await io.copy(from,to);
  if(!do_copy){
    return false;
  } else {
    return true;
  }

}
