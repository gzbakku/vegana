//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-xxxx';             //dont worry about this
const type = 'comp';                      //type of app
const compName = 'mmmmComp';

//ids
var parentId;
var compId;

const init = (pid) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build();                      //start build you can also start fetch here.

}

//build the dom for comp here
function build(){

  engine.common.tell('building',log);

  //sample greetings
  let greetings = engine.make.div({
    id:"greetings",
    parent:compId,
    class:'greetings',
    text:'greetings this is the global nnnn comp'
  });

  return true; //always return after build it can be

}

let compController = {init:init,ref:compRef,type:type};
if(!engine.global.comp.hasOwnProperty(compName)){
  engine.add.comp(compName,compController);
} else {
  engine.common.error(compName + " global comp has been already been added to the global comp object.");
}
module.exports = compController;
