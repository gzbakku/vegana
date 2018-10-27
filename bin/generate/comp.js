//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-xxxx';             //dont worry about this
const type = 'comp';                      //type of app

//ids
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

//build the dom for comp here
function build(){

  engine.common.tell('building',log);

  //sample greetings
  let greetings = engine.make.div(
    compId + "-div-greetings",
    compId,
    'greetings',
    'greetings this is the nnnn comp'
  );

  return true; //always return after build it can be

}

module.exports = {init:init,ref:compRef,type:type}
