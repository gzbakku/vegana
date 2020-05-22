const common = require('../../common');
const gen = require('./gen');

async function init(type,name,laziness){

  if(type == null || type == undefined){
    common.tell('what do you want us to generate page,comp,cont or panel please tell us.');
    common.tell('example : vegana generate page main');
    return common.error('no_comp_type_found');
  }
  if(name == null || name == undefined){
    common.tell('what do you want us to call this component?');
    common.tell('example : vegana generate page login (where login is the name)');
    return common.error('no_comp_name_found');
  }

  //check type

  if(typeof(type) !== 'string'){
    common.tell('valid components : page,comp,cont or panel');
    return common.error('invalid_comp_type');
  }

  let typeBank = ['page','comp','cont','panel','sass','wasm'];

  if(typeBank.indexOf(type) < 0){
    common.tell('valid components : page, comp, cont, scss, panel and wasm');
    return common.error('invalid_component');
  }

  //check name

  if(typeof(name) !== 'string'){
    common.tell('valid name : login, super user and bella thorne');
    return common.error('invalid_name_type');
  }

  if(name.length < 1){
    return common.error('component name cannot be shorter then 4 letters');
  }

  let isLazy = false;

  if(process.argv[5]){
    if(process.argv[5] == '--lazy'){
      isLazy = true;
    }
  }

  let work = await gen.init(type,name,isLazy);

  if(work == true){
    return common.tell('generate successfull');
  } else {
    return common.error('generate failed');
  }

}

module.exports= {
  init:init
};
