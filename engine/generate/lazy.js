const fs = require('fs-extra');
const common = require('../../common');

module.exports = {

  init : async function(laziness,type,name,pgName,cnName,pnName){

    common.tell('generating lazy address for compiler');

    if(laziness == false || !laziness){
      return true;
    }

    let currentDirectory = process.cwd() + '\\';
    let lazyPath = '';

    if(type !== 'sass'){

      if(!currentDirectory.match('app')){
        return common.error('invalid-project_directory');
      }

      let locationArray = currentDirectory.split('\\');

      let appIndex = locationArray.indexOf('app');

      for(var i=0;i<appIndex;i++){
        let pathComp = locationArray[i];
        lazyPath = lazyPath + pathComp + '\\';
      }

      lazyPath = lazyPath + 'lazy.json';

    } else {

      if(!currentDirectory.match('sass')){
        return common.error('invalid-project_directory');
      }

      let locationArray = currentDirectory.split('\\');

      let appIndex = locationArray.indexOf('sass') - 1;

      for(var i=0;i<=appIndex;i++){
        let pathComp = locationArray[i];
        lazyPath = lazyPath + pathComp + '\\';
      }

      lazyPath = lazyPath + 'lazy.json';

    }

    let read = await fs.readFile(lazyPath,'utf-8')
    .then((data)=>{
      return data;
    })
    .catch((err)=>{
        console.log(err);
        return false;
    });

    if(read == false){
      return common.error('read lazy.json failed');
    }

    if(!JSON.parse(read)){
      return common.error('invalid/corrupt-lazy.json');
    }

    let bool = JSON.parse(read);

    //do sass
    if(type == 'sass'){
      if(!bool.sass){
        bool['sass'] = [name];
      } else {
        bool.sass.push(name);
      }
    }

    //do globals
    if(type == 'globalComp'){
      if(!bool.globals){
        bool['globals'] = [name + 'Comp'];
      } else {
        bool.globals.push(name + 'Comp');
      }
    }

    //do page
    if(type == 'page'){
      if(!bool.pages){
        bool['pages'] = [name + 'Page'];
      } else {
        bool.pages.push(name + 'Page');
      }
    }

    //do cont
    if(type == 'cont'){
      if(!bool.conts){
        bool['conts'] = {};
      }
      if(!bool.conts[pgName]){
        bool.conts[pgName] = [name + 'Cont'];
      } else {
        bool.conts[pgName].push(name + 'Cont');
      }
    }

    //do panel
    if(type == 'panel'){
      //check page
      if(!bool.panels){
        bool['panels'] = {};
      }
      if(!bool.panels[pgName]){
        bool.panels[pgName] = {};
      }
      if(!bool.panels[pgName][cnName]){
        bool.panels[pgName][cnName] = [name + 'Panel'];
      } else {
        bool.panels[pgName][cnName].push(name + 'Panel');
      }
    }

    let write = await fs.writeFile(lazyPath,JSON.stringify(bool,null,2),'utf-8')
    .then(()=>{
      return true;
    })
    .catch((err)=>{
      console.log(err);
      return false;
    });

    if(write == false){
      return common.error('write updated lazy.json failed');
    }

    return true;

  }

};
