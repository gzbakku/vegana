//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-xxxx';             //dont worry about this
const type = 'comp';                      //type of app

const init = (pid,data) => { //pid refers to the parent div id, pass this var when you init this comp.
  const compId = engine.make.div({
    parent:pid,
    class:"comp",
  });
  return build(compId,data); //start build you can also start fetch here.
}

//these trackers will be triggered when this module is routed
const trackers = {
  title:'sample comp title',
  meta:[
    {
      name:'description',
      content:'this is a sample comp description'
    },
    {
      name:'keywords',
      content:'comp,vegana'
    }
  ],
  function_data:{},
  //function will be triggered with the function data as input when the module is routed to.
  function:(function_data)=>{},
  onRoute:(data)=>{},
};

//build the dom for comp here
async function build(compId,data){

  engine.common.tell('building',log);

  //sample greetings
  let greetings = engine.make.div({
    id:"greetings",
    parent:compId,
    class:'greetings',
    text:'greetings this is the nnnn comp'
  });

  return true; //always return after build it can be

}

module.exports = {init:init,ref:compRef,type:type,trackers:trackers}
