//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-xxxx';
const pageName = 'pgName';
const contName = 'mmmmCont';

//cont ids
let parentId,contId;

//any parent data can be imported in init function vars
const init = (pid) => {                                                //pid = parent id(parent = page)

  if(pid == null || pid == undefined){
    return engine.common.error('parent_page_id_not_found');            //check for prent page id
  }

  engine.common.tell('cont initiated',log);                            //common tell logger can be closed if global const log be set to false

  parentId = pid;                                                      //parent id is used to route
  contId = parentId + contRef;                                         //contid is used by child doms

  engine.make.init.cont(contId,parentId,"cont");                       //initiate cont in router before building dom

  build();                                                             //start dom build here

}

//build the cont dom here
function build(){

  engine.common.tell('building',log);

  //sample greetings
  let greetings = engine.make.div(
    contId + "-div-greetings",
    contId,
    'greetings',
    'greetings this is the nnnn cont'
  );

  //import panels when required to build required objects faster

  return true; //always return

}

//do not change current exports you are free to add your own though.
const contControllers = {
  init:init,
  ref:contRef,
  type:type,
  contName:contName,
  panelModules:{},        //dont fill this object, imported panels are loaded automatically.
  panelList:{}
};

module.exports = contControllers;
window.pageModules[pageName].contModules[contName] = contControllers;
