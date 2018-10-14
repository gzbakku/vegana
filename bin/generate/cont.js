//modules
const engine = require('vegana-engine');

//cont controllers
const log = false;
const contRef = '-cont-xxxx';
const type = 'cont';

//cont ids
var parentId;
var contId;

//import panels here :-
//const bootPanel = require('../../panels/bootPanel/index');

const init = (pid) => {                                                //pid = parent id(parent = page)

  if(pid == null || pid == undefined){
    return engine.common.error('parent_page_id_not_found');            //check for prent page id
  }

  engine.common.tell('cont initiated',log);                            //common tell logger can be closed if global const log be set to false

  parentId = pid;                                                      //parent id can be used to route
  contId = parentId + contRef;                                         //contid is used by child doms

  engine.make.init.cont(contId,parentId,"cont");                       //initiate cont in router before building dom

  build();                                                             //start dom build here

}

function fetch(){
  engine.common.tell('fetching',log);
  build();
}

function build(){


  engine.common.tell('building',log);

  //****************************************************************************
  //text
  //greetings text
  let greetings = make.div(contId + "-div-text",contId,"greetings");
  if(greetings !== false){
    engine.make.text(contId + "-div-text","this is the nnnn cont");
  }

  return true; //always return 

}

module.exports = {init:init,ref:contRef,type:type}
