

module.exports = {

  init:async (projectDir,projectName)=>{

    common.tell("customizing project files");

    let fileDestination = projectDir + '/index.html';

    let index = await io.read(fileDestination);
    if(index == false){
      return common.error('read_failed index.html');
    }

    let final = index.replace('xxxx',projectName);

    let write = await io.write(fileDestination,final);
    if(write == false){
      return common.error('write_failed index.html');
    }

    return true;

  }

};
