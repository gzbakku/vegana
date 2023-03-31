//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-xxxx';
const pageName = 'pgName';
const contName = 'mmmmCont';

//cont ids
let parentId,contId;

//any parent data can be imported in init function vars
const init = (pid,data) => {                                                //pid = parent id(parent = page)

  if(pid == null || pid == undefined){
    return engine.common.error('parent_page_id_not_found');            //check for prent page id
  }

  engine.common.tell('cont initiated',log);                            //common tell logger can be closed if global const log be set to false

  parentId = pid;                                                      //parent id is used to route
  contId = parentId + contRef;                                         //contid is used by child doms

  engine.make.init.cont(contId,parentId,"cont");                       //initiate cont in router before building dom

  return build(data);                                                             //start dom build here

}

//these trackers will be triggered when this module is routed
const trackers = {
  title:'sample cont title',
  meta:[
    {
      name:'description',
      content:'this is a sample cont description'
    },
    {
      name:'keywords',
      content:'cont,vegana'
    }
  ],
  function_data:{},
  //function will be triggered with the function data as input when the module is routed to.
  function:(function_data)=>{},
  onRoute:(data)=>{},
  onBack:(url)=>{}
};

//build the cont dom here
async function build(data){

  engine.common.tell('building',log);

  //sample greetings
  let greetings = engine.make.div({
    id:"greetings",
    parent:contId,
    class:'greetings',
    text:'greetings this is the nnnn cont'
  });

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
  panelList:{},
  trackers:trackers
};

module.exports = contControllers;
window.pageModules[pageName].contModules[contName] = contControllers;
