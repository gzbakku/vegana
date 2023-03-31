//controllers
const log = false;
const type = 'page';

//ids
const pageId = "page-xxxx";
const pageName = 'mmmmPage';

//init page
const init = (data) => {
  engine.make.init.page(pageId,"page");  //init page
  return build(data);                    //start build
}

//these trackers will be triggered when this module is routed
const trackers = {
  title:'sample page title',
  meta:[
    {
      name:'description',
      content:'this is a sample page description'
    },
    {
      name:'keywords',
      content:'page,vegana'
    }
  ],
  function_data:{},
  //function will be triggered with the function data as input when the module is routed to.
  function:(function_data)=>{},
  onRoute:(data)=>{},
  onBack:(url)=>{}
};

//build page
async function build(data){

  engine.common.tell('building',log);

  //sample greetings
  let greetings = engine.make.div({
    id:"greetings",
    parent:pageId,
    class:'greetings',
    text:'greetings this is the nnnn page'
  });

  //import conts when required to build required objects faster

  return true; //always return after the build completes

}

//do not change current exports you are free to add your own though.
let pageControllers = {
  init:init,
  ref:pageId,
  type:type,
  name:pageName,
  contModules:{},
  contList:{},
  trackers:trackers
};
module.exports = pageControllers;
window.pageModules[pageName] = pageControllers;
