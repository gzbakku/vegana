const gen = require('./gen');

async function init(type,name,laziness){

  let no_type = false,no_name = false;
  if(!type){
    no_type = true;
    type = await input.select("please select a module type",['page','cont','panel','comp','sass','wasm']);
  }
  if(!name){
    no_name = true;
    name = await input.text("please provide a valid name for this module");
  }
  if((no_type || no_name) && type !== "wasm"){
    is_lazy = await input.select("is this module lazy?",['no','yes']);
    if(is_lazy === "yes"){laziness = "--lazy"}
  }

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

  let isLazy = false,isGlobal = false;

  if(laziness){
    if(laziness === '--lazy'){
      isLazy = true;
    } else if(laziness === "--global"){
      isGlobal = true;
    }
  }

  let work = await gen.init(type,name,isLazy,no_type || no_name,isGlobal);

  if(work == true){
    return common.success('generated successfully');
  } else {
    return common.error('generate failed');
  }

}

module.exports= {
  init:init
};
