// const fs = require('fs-extra');

module.exports = {

  init : async function(laziness,type,name,pgName,cnName,pnName,base_dir){

    common.tell('generating lazy address for compiler');

    if(laziness == false || !laziness){return true;}

    let bool = await io.lazy.read();
    if(!bool){
      return common.error('read lazy.json failed');
    }

    //do sass
    if(type == 'sass'){
      if(!bool.sass){
        bool['sass'] = [name + "Pack"];
      } else {
        bool.sass.push(name + "Pack");
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

    if(!io.lazy.write(bool)){
      return common.error("failed-update_lazy_list-add_module_to_lazy_list");
    } else {return true;}

  }

};
