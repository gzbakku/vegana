//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-xxxx';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

const init = (pid,data) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  return build(data);                      //start build you can also start fetch here.

}

async function build(data){

  engine.common.tell('building',log);

  //sample greetings
  let greetings = engine.make.div({
    id:"greetings",
    parent:compId,
    class:'greetings',
    text:'greetings this is the nnnn ui comp'
  });

  return true; //always return after build it can be

}

module.exports = {init:init,ref:compRef,type:type}
