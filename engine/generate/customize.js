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

    let editTag = index.replaceAll('xxxx',name);

    if(editTag.match('mmmm')){
      editTag = editTag.replaceAll('mmmm',name);
    }
    if(editTag.match('nnnn')){
      editTag = editTag.replaceAll('nnnn',name);
    }
    if(editTag.match('pgName')){
      editTag = editTag.replaceAll('pgName',pgName);
    }
    if(editTag.match('cnName')){
      editTag = editTag.replaceAll('cnName',cnName);
    }
    if(editTag.match('pnName')){
      editTag = editTag.replaceAll('pnName',name + 'Panel');
    }

    let write = await io.write(fileLocation,editTag);
    if(write == false){
      return common.error('write_failed');
    }

    return true;

  }

};
