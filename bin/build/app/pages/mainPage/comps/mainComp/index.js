//modules
const engine = require('vegana-engine');

//comp consts
const log = false;				//turn this boolean to false to stop common tell logger
const compRef = "-comp-main";
const type = 'comp';

//universal var
var parentId;
var compId;

const init = (pid) => {		//pid refers to the page id of the parent page

  //check parent page id
  if(pid == null || pid == undefined){
	  return engine.common.error('no_parent_page_found');	//common error function logs the given error to the console
  }

  //set comp ref
  parentId = pid;				//parent page div id
  compId = parentId + compRef;	//comp div id

  //init comp functions
  engine.make.init.comp(compId,parentId,"comp");			//initiate comp
  build();													//start comp build

}

//fetch data before from api before build
function fetch(){
  engine.common.tell('fetching',log);			//common teller in engine logs the input if log const is true
  build();										//start page build here
}

//build comp dom
function build(){

  engine.common.tell('building',log);

  //refer to the docs for make module functions

  //demo comp text
  let greetings = engine.make.div(compId + "-text-div",compId,"greetings");
  if(greetings !== false){
    engine.make.text(greetings,"this is the main comp");
  }

}

//export comp here
module.exports = {init:init,ref:compRef,type:type}
