const engine = require('vegana-engine');
const common = engine.common;
const make = engine.make;
const router = engine.router;
const view = engine.view;
const binder = engine.binder;
const log = false;
const contRef = '-cont-main';

var parentId;
var contId;

//panels
const bootPanel = require('../../panels/bootPanel/index');
const mainPanel = require('../../panels/mainPanel/index');

//boot cont ref
const bootCont = require('../bootCont/index');

const init = (pid) => {
  common.tell('===========================================',log);
  common.tell('cont initiated',log);
  parentId = pid;
  contId = parentId + contRef;
  make.init.cont(contId,parentId,"cont");
  build();
}

function fetch(){
  common.tell('fetching',log);
  build();
}

function build(){


  common.tell('building',log);

  //****************************************************************************
  //text
  //greetings text
  let greetings = make.div(contId + "-div-text",contId,"greetings");
  if(greetings !== false){
    make.text(contId + "-div-text","this is the main cont");
  }

  //****************************************************************************
  //button
  //make cont chnage button here
  let gotoCont = make.button(contId + '-button-goto-cont',contId,'goto','go to boot cont');

  //click function
  let echoCont = function(){
    console.log('click');
    router.navigate.cont.to(bootCont);
  }

  //bind goto
  let listenGotoCont = binder.click(gotoCont,echoCont);

  //............................................................................
  // panel router

  //initiate panel router
  router.init.panels(contId);

  //initiate panel
  mainPanel.init(contId);

}

module.exports = {init:init,ref:contRef}
