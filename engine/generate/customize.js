const common = require('../../common');
const fs = require('fs-extra');

module.exports = {

  init : async function(name,fileLocation){

    common.tell('customizing generated file');

    //read the file

    let index = await fs.readFile(fileLocation,'utf-8')
    .then((data)=>{
      return data;
    })
    .catch((err)=>{
        console.log(err);
        return false;
    });

    if(index == false){
      return common.error('read_failed');
    }

    let editTag = index.replace('xxxx',name);
    let editText = editTag.replace('nnnn',name);

    let write = await fs.writeFile(fileLocation,editText,'utf-8')
    .then(()=>{
      return true;
    })
    .catch((err)=>{
      console.log(err);
      return false;
    });

    if(write == false){
      return common.error('write_failed');
    }

    return true;

  }

};
