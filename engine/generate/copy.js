const common = require('../../common');
const fs = require('fs-extra');

module.exports = {

  init : async function(type,compLocation,name){

    //get app directory
    let scriptAddressRef = process.argv[1];
    let scriptMidPoint = scriptAddressRef.lastIndexOf('\\');
    let appDirectory = scriptAddressRef.substring(0,scriptMidPoint)  + '\\generate\\';

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

    let copy = await fs.copy(fileLocation,fileDestination)
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
