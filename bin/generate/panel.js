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

//fetch data before dom build here
function fetch(){
  engine.common.tell('fetching',log);
  build();
}

//build dom here
function build(){

  engine.common.tell('building',log);

  //sample greetings
  let greetings = engine.make.div(
    panelId + "-div-greetings",
    panelId,
    'greetings',
    'greetings this is the nnnn panel'
  );

  return true; //always return

}

const panelController = {
  init:init,
  ref:panelRef,
  type:type,
  panelName:panelName
};
engine.router.set.panelModule(pageName,contName,panelName,panelController);
module.exports = panelController;
