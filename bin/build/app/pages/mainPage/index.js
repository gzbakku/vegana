//module imports
const engine = require('vegana-engine');

//page consts
const log = false;				//turn to false if you want to block common tell logging
const pageId = "page-main";
const type = 'page';

//import comps
const mainComp = require('./comps/mainComp/index');

//init page build here
const init = () => {
  engine.make.init.page(pageId,"page");	//insert page to the router here	
  build();								//start page build here you can start fetch here too.
}

//fetch data from api before building dom here
function fetch(){
  engine.common.tell('fetching',log);	//common tell function logs the input if the const log is true
  build();								//start build here you can fetch here too.
}

//build page dom here
function build(){

  //log 
  engine.common.tell('building',log);

  //sample text
  let greetings = engine.make.div(pageId + "text-div",pageId,"greetings");
  if(greetings !== false){
    engine.make.text(greetings,"greetings this is the main page");
  }

  //init comp
  mainComp.init(pageId);
  
  return true; //always return after build finish

}

//return page module for engine to work with
module.exports = {init:init,ref:pageId,type:type}
