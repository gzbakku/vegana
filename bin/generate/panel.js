//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-xxxx';
const pageName = 'pgName';
const contName = 'cnName';
const panelName = 'pnName';

//ids
let parentId,panelId;

//init dom build here
const init = (pid) => {

  engine.common.tell('panel initiated',log);

  if(pid == null || pid == undefined){
    return engine.common.error('parent_cont_id_not_found');            //check for prent page id
  }

  parentId = pid;
  panelId = parentId + panelRef;

  engine.make.init.panel(panelId,parentId,"panel");

  build();

}

//these trackers will be triggered when this module is routed
const trackers = {
  title:'sample panel title',
  meta:[
    {
      name:'description',
      content:'this is a sample panel description'
    },
    {
      name:'keywords',
      content:'panel,vegana'
    }
  ],
  function_data:{},
  //function will be triggered with the function data as input when the module is routed to.
  function:(function_data)=>{}
};

//fetch data before dom build here
function fetch(){
  engine.common.tell('fetching',log);
  build();
}

//build dom here
function build(){

  engine.common.tell('building',log);

  //sample greetings
  let greetings = engine.make.div({
    id:"greetings",
    parent:panelId,
    class:'greetings',
    text:'greetings this is the nnnn panel'
  });

  return true; //always return

}

const panelController = {
  init:init,
  ref:panelRef,
  type:type,
  panelName:panelName,
  trackers:trackers
};
engine.router.set.panelModule(pageName,contName,panelName,panelController);
module.exports = panelController;
