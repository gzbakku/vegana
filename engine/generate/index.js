const gen = require('./gen');

async function init(type,name){

  if(name && name.indexOf("--") >= 0){name = null;}

  if(get_variable("--help")){
    return common.tell("valid flags are : --lazy --common --global --lazy --common --not-lazy --not-common --name");
  }

  const types = ['page','cont','panel','comp','sass','wasm'];
  if(type && type.length > 0 && types.indexOf(type) < 0){
    common.error("sorry i cant make " + type);
    common.tell("you can make 'page','cont','panel','comp','sass','wasm'");
    type = await input.select("please select a module type",types);
  }

  let no_type = false,no_name = false;
  if(!type){
    no_type = true;
    type = await input.select("please select a module type",['page','cont','panel','comp','sass','wasm']);
  }
  if(!name){
    name = get_variable("--name");
  }
  if(!name){
    no_name = true;
    name = await input.text("please provide a valid name for this module");
  }

  if(type === "comp"){name = name.replace("Comp","");} else
  if(type === "page"){name = name.replace("Page","");} else
  if(type === "cont"){name = name.replace("Cont","");} else
  if(type === "panel"){name = name.replace("Panel","");}

  if(type === null || type === undefined){
    common.tell('what do you want us to generate page,comp,cont or panel please tell us.');
    common.tell('example : vegana generate page main');
    return common.error('no_comp_type_found');
  }
  if(name === null || name === undefined){
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

  let
  isLazy = get_variable("--lazy"),
  isGlobal = get_variable("--common") || get_variable("--global");
  if(!isLazy && type !== "wasm" && !get_variable("--not-lazy")){
    let is_lazy = await input.select("is this module lazy?",['no','yes']);
    if(is_lazy === "yes"){isLazy = true;}
  }
  let dont_run_global = get_variable("--not-global") || get_variable("--not-common");
  if(type === "comp" && !isLazy && !dont_run_global){
    let is_global = await input.select("is this common comp?",['no','yes']);
    if(is_global === "yes"){isGlobal = true;}
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
