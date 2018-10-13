const engine = require('vegana-engine');
const common = engine.common;
const make = engine.make;
const view = engine.view;
const binder = engine.binder;
const router = engine.router;
const log = false;
const panelRef = '-panel-main';

var parentId;
var panelId;

const bootPanel = require('../bootPanel/index');

const init = (pid) => {
  common.tell('panel initiated',log);
  parentId = pid;
  panelId = parentId + panelRef;
  make.init.panel(panelId,parentId,"panel");
  build();
}

function fetch(){
  common.tell('fetching',log);
  build();
}

function build(){

  common.tell('building',log);

  let greetings = make.div(panelId + "-text-div",panelId,"greetings");
  if(greetings !== false){
    make.text(greetings,"this is the main panel");
  }

  //****************************************************************************
  //button
  //make cont chnage button here
  let gotoPanel = make.button(panelId + '-button-goto-panel',panelId,'goto','go to boot panel');

  //click function
  let echoPanel = function(){
    console.log('click');
    router.navigate.panel.to(bootPanel);
  }

  //bind goto
  let listenGotoPanel = binder.click(gotoPanel,echoPanel);

}

module.exports = {init:init,ref:panelRef}
