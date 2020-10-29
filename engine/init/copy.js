

module.exports = {

  init:async (projectDir)=>{

    common.tell("generating project files");

    let files = [
      'index.html',
      'compile.js',
      'lazy.json',
      'css',
      'app',
      'js',
      'assets',
      'sass',
      '.gitignore'
    ];

    let success = true;
    let appDirectory = io.dir.app() + "/build/";
    for(var file of files){
      let fileLocation = appDirectory + file;
      let fileDestination = projectDir + "/" + file;
      if(true){
        let copy = await io.copy(fileLocation,fileDestination);
        if(!copy){success = false;break;}
      }
    }
    if(!success){
      common.error('something went wrong while building project');
      return common.error('please remove all the contents from the folder and try again');
    }

    return true;

  }

};
