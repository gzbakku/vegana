module.exports = {

  init : async function(type,compLocation,name){

    let appDirectory = io.dir.app() + "/generate/";

    let fileNames = {
      comp:'comp',
      globalComp:'globalComp',
      page:'page',
      cont:'cont',
      panel:'panel',
      sass:'css'
    };

    let fileExt = {
      comp:'.js',
      globalComp:'.js',
      page:'.js',
      cont:'.js',
      panel:'.js',
      sass:'.scss'
    };

    let fileLocation = appDirectory + fileNames[type] + fileExt[type];
    let fileDestination;
    if(type == 'sass'){
      fileDestination = compLocation + name + fileExt[type];
    } else {
      fileDestination = compLocation + fileNames[type]  + fileExt[type];
    }

    let copy = await io.copy(fileLocation,fileDestination)
    .then(()=>{
      return true;
    })
    .catch((error)=>{
      return common.error(error);
    });

    if(copy == true){
      return fileDestination;
    } else {
      return common.error('file_deploy failed');
    }

  }

}
