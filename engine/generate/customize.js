module.exports = {

  init : async function(fileLocation,name,pgName,cnName,pnName,type){

    common.tell('customizing generated file');

    //read the file

    if(type == 'sass'){
      return true;
    }

    let index = await io.read(fileLocation);
    if(index == false){
      return common.error('read_failed');
    }

    let editTag = index.replace('xxxx',name);

    if(editTag.match('mmmm')){
      editTag = editTag.replace('mmmm',name);
    }
    if(editTag.match('nnnn')){
      editTag = editTag.replace('nnnn',name);
    }
    if(editTag.match('pgName')){
      editTag = editTag.replace('pgName',pgName);
    }
    if(editTag.match('cnName')){
      editTag = editTag.replace('cnName',cnName);
    }
    if(editTag.match('pnName')){
      editTag = editTag.replace('pnName',name + 'Panel');
    }

    let write = await io.write(fileLocation,editTag);
    if(write == false){
      return common.error('write_failed');
    }

    return true;

  }

};
