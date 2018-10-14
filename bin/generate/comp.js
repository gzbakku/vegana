//global imports
const engine = require('vegana-engine');  //engine holds all the tools to build dom, bind events, route and control div views
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-xxxx';             //dont worry about this
const type = 'comp';                      //type of app

//universal variables
var parentId;
var compId;

const init = (pid) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  build();                      //start build you can also start fetch here.

}
//init ends here

//fetch data from api before build
function fetch(){
  engine.common.tell('fetching',log);  //tell logs the input string if global log constant is true
  //build();                           //you can start build after you fetch data
}

//build the dom for comp here
function build(){

  engine.common.tell('building',log);

  //............................................................................
  //text exmaple
  let greetings = make.div(compId + "-text-div",compId,"greetings");
  if(greetings !== false){
    engine.make.text(greetings,"this is the nnnn comp");
  }

  return; //always return after build it can be

  //for more refer docs

}

module.exports = {init:init,ref:compRef,type:type}
