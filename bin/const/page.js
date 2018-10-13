//global imports
const engine = require('vegana-engine');
const log = false;
const pageId = "page-xxxx";
const type = 'page';

//import conts

//import comps

//init page
const init = () => {
  make.init.page(pageId,"page");  //init page
  build();                        //start build
}

//fetch data
function fetch(){
  common.tell('fetching',log);
  build();
}

//build page
function build(){

  common.tell('building',log);

  //greetings text div
  let greetings = make.div(pageId + "text-div",pageId,"greetings");
  if(greetings !== false){
    make.text(greetings,"greetings this is the main page");
  }

  //make page comps here
  mainComp.init(pageId);      //init random comp
  router.init.conts(pageId);  //init cont router
  mainCont.init(pageId);      //init random cont

  return; //always return after the build completes

}

//do ont chnage current exports you are free to add your own though.
module.exports = {init:init,ref:pageId,type:type}
