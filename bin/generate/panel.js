//modules
const engine = require('vegana-engine');

//controllers
const log = false;
const type = 'panel';

//ids
const panelRef = '-panel-xxxx';
var parentId;
var panelId;

//init dom build here
const init = (pid) => {

  common.tell('panel initiated',log);

  if(pid == null || pid == undefined){
    return engine.common.error('parent_cont_id_not_found');            //check for prent page id
  }

  parentId = pid;
  panelId = parentId + panelRef;

  make.init.panel(panelId,parentId,"panel");

  build();

}

//fetch data before dom build here
function fetch(){
  common.tell('fetching',log);
  build();
}

//build dom here
function build(){

  common.tell('building',log);

  //****************************************************************************
  //text
  //greetings text
  let greetings = make.div(panelId + "-text-div",panelId,"greetings");
  if(greetings !== false){
    make.text(greetings,"this is the nnnn panel");
  }

  return true; //always return 

}

module.exports = {init:init,ref:panelRef,type:type}
