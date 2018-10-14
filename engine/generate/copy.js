const common = require('../../common');
const fs = require('fs-extra');

module.exports = {

  init : async function(type,compLocation){

    //get app directory
    let scriptAddressRef = process.argv[1];
    let scriptMidPoint = scriptAddressRef.lastIndexOf('\\');
    let appDirectory = scriptAddressRef.substring(0,scriptMidPoint)  + '\\generate\\';

    let fileNames = {
      page:'page.js',
      comp:'comp.js',
      cont:'cont.js',
      panel:'panel.js',
    };

    let fileLocation = appDirectory + fileNames[type];
    let fileDestination = compLocation + fileNames[type];

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
