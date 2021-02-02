const gen = require('./gen');

async function init(type,name,laziness){

  const types = ['page','cont','panel','comp','sass','wasm'];
  if(types.indexOf(type) < 0){
    common.tell("you cant make 'page','cont','panel','comp','sass','wasm'");
    return common.error("sorry i cant make " + type);
  }
  const laziness_options = ['--lazy','--common','--global'];
  if(laziness && laziness_options.indexOf(laziness) < 0){
    common.tell("valid module route controls are '--lazy', '--common', '--global'");
    return common.error("that is a invalid module route type : " + laziness);
  }
  if(laziness_options.indexOf(name) >= 0){
    common.tell("valid generate commands looks like : vegana generate page king --lazy");
    common.tell("valid generate commands looks like : vegana generate 'module_type' 'module_name' ('--lazy' || '--common' || '--global')");
    return common.error("you most probably didnt named the module.");
  }
  if(name.indexOf("--") >= 0){
    check_name = await input.select("are you sure you wanna name your module : " + name,['no','yes']);
    if(check_name === "no"){
      return common.error("thanks i dont like it anyways");
    } else {
      common.tell("if you say so.");
    }
  }

  let no_type = false,no_name = false;
  if(!type){
    no_type = true;
    type = await input.select("please select a module type",['page','cont','panel','comp','sass','wasm']);
  }
  if(!name){
    no_name = true;
    name = await input.text("please provide a valid name for this module");
  }
  if(!laziness && type !== "wasm"){
    is_lazy = await input.select("is this module lazy?",['no','yes']);
    if(is_lazy === "yes"){laziness = "--lazy"}
  }

  if(type === "comp" && !laziness){
    let is_global = await input.select("is this common comp?",['no','yes']);
    if(is_global === "yes"){laziness = '--common';}
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
    } else if(laziness === "--global" || laziness === "--common"){
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
