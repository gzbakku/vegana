const fs = require('fs-extra');
const common = require('../../common');

module.exports = {

  init : async function(type,name){

    common.tell('checking container directory');

    let currentDirectory = process.cwd() + '\\';

    let containerBank = {
      page:'pages\\',
      cont:'conts\\',
      comp:'comps\\',
      panel:'panels\\'
    };

    let containerTag = {
      page:'Page',
      cont:'Cont',
      comp:'Comp',
      panel:'Panel'
    };

    let currentContainer = containerBank[type];

    let containerLocation = currentDirectory + currentContainer;
    let compLocation = containerLocation + name + containerTag[type] + '\\';

    if(!fs.existsSync(containerLocation)){
      let makecd = await makeContainerDirectory(containerLocation);
      if(makecd == false){
        return  common.error('make_container_directory failed');
      }
    }

    if(fs.existsSync(compLocation)){
      return  common.error('component : ' + containerTag[type] + ' with name of : ' + name + ' already exists in the container directory');
    }

    if(!fs.existsSync(compLocation)){
      let makecd = await makeCompDirectory(compLocation);
      if(makecd == false){
        return  common.error('make_comp_directory failed');
      }
    }

    return compLocation;

  }

};

async function makeContainerDirectory(containerLocation){

  //make container directory

  common.tell('making container directory');

  let create = await fs.mkdir(containerLocation)
  .then(()=>{
    return true;
  })
  .catch((err)=>{
    return common.error(err);
  });

  return create;

}

async function makeCompDirectory(compLocation){

  //make comp directory

  common.tell('making comp directory');

  let create = await fs.mkdir(compLocation)
  .then(()=>{
    return true;
  })
  .catch((err)=>{
    return common.error(err);
  });

  return create;

}
