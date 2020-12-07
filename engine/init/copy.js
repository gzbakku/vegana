

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
    ];

    let success = true;
    let appDirectory = await io.dir.app();
    // return false;

    for(var file of files){
      let fileLocation = appDirectory + "/build/" + file;
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

    if(true){
      let gitignore_base_location = appDirectory + "/_gitignore";
      let gitignore_dest_location = projectDir + "/.gitignore";
      let copy_gitignore = await io.copy(gitignore_base_location,gitignore_dest_location);
      if(!copy_gitignore){return common.error("failed-config-gitignore");}
    }

    return true;

  }

};
