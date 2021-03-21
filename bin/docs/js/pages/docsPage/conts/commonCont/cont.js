(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-common';
const pageName = 'docsPage';
const contName = 'commonCont';

//cont ids
let parentId,contId;

//any parent data can be imported in init function vars
const init = (pid,data) => {                                                //pid = parent id(parent = page)

  if(pid == null || pid == undefined){
    return engine.common.error('parent_page_id_not_found');            //check for prent page id
  }

  engine.common.tell('cont initiated',log);                            //common tell logger can be closed if global const log be set to false

  parentId = pid;                                                      //parent id is used to route
  contId = parentId + contRef;                                         //contid is used by child doms

  engine.make.init.cont(contId,parentId,"cont");                       //initiate cont in router before building dom

  build(data);                                                             //start dom build here

}

function build(data){

  if(!data){data = {};}
  if(!data.panel){data.panel = 'tellPanel';}

  const tellPanel = require("./panels/tellPanel/panel");
  const errorPanel = require("./panels/errorPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","commonCont",data.panel);
  engine.router.navigate.to.panel(mod);

}

//do not change current exports you are free to add your own though.
const contControllers = {
  init:init,
  ref:contRef,
  type:type,
  contName:contName,
  panelModules:{},        //dont fill this object, imported panels are loaded automatically.
  panelList:{},
  trackers:null
};

module.exports = contControllers;
window.pageModules[pageName].contModules[contName] = contControllers;

},{"./panels/errorPanel/panel":2,"./panels/tellPanel/panel":4}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-error';
const pageName = 'docsPage';
const contName = 'commonCont';
const panelName = 'errorPanel';

//ids
let parentId,panelId;

//init dom build here
const init = (pid) => {

  engine.common.tell('panel initiated',log);

  if(pid == null || pid == undefined){
    return engine.common.error('parent_cont_id_not_found');            //check for prent page id
  }

  parentId = pid;
  panelId = parentId + panelRef;

  engine.make.init.panel(panelId,parentId,"panel");

  build();

}

const trackers = {
  title:'Vegana Api : Engine Common Error',
  meta:[
    {
      name:'description',
      content:'console log error in vegana js'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,common,error'
    }
  ],
  function_data:{},
  function:(function_data)=>{}
};

function build(){
  const article = require("./vDoc.json");
  engine.ui.getComp("commonUi","articleComp").init(panelId,{
    article:article
  });
}

const panelController = {
  init:init,
  ref:panelRef,
  type:type,
  panelName:panelName,
  trackers:trackers
};
engine.router.set.panelModule(pageName,contName,panelName,panelController);
module.exports = panelController;

},{"./vDoc.json":3}],3:[function(require,module,exports){
module.exports={
  "template": [
    "2iyza9rkkm1pgl2c",
    "2iyza7ekkm2stknj"
  ],
  "rows": {
    "2iyza9rkkm1pgl2c": {
      "id": "2iyza9rkkm1pgl2c",
      "template": [
        "2iyza9rkkm1pgmf8",
        "2iyza9rkkm1pgwzx"
      ],
      "containers": {
        "2iyza9rkkm1pgmf8": {
          "id": "2iyza9rkkm1pgmf8",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.common.error"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api is used to log errors with \"!!! \" prefix and data if given, it takes 2 arguments first is string second is any valid js object they will be console logged."
            }
          },
          "style": {
            "width": "90%"
          }
        }
      }
    },
    "2iyza7ekkm2stknj": {
      "id": "2iyza7ekkm2stknj",
      "template": [
        "2iyza7ekkm2stlnb"
      ],
      "containers": {
        "2iyza7ekkm2stlnb": {
          "id": "2iyza7ekkm2stlnb",
          "field": {
            "type": "code",
            "data": {
              "value": "\n\nconst data = {error:'some'};\n\nengine.common.error(\"some failed\",data);\n\n//console output = \"!!! some failed\"\n//alos the data is printed in console"
            }
          },
          "style": {
            "width": "90%"
          }
        }
      }
    }
  }
}
},{}],4:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-tell';
const pageName = 'docsPage';
const contName = 'commonCont';
const panelName = 'tellPanel';

//ids
let parentId,panelId;

//init dom build here
const init = (pid) => {

  engine.common.tell('panel initiated',log);

  if(pid == null || pid == undefined){
    return engine.common.error('parent_cont_id_not_found');            //check for prent page id
  }

  parentId = pid;
  panelId = parentId + panelRef;

  engine.make.init.panel(panelId,parentId,"panel");

  build();

}

const trackers = {
  title:'Vegana Api : Engine Common Tell',
  meta:[
    {
      name:'description',
      content:'how to debug in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,common,tell'
    }
  ],
  function_data:{},
  function:(function_data)=>{}
};

function build(){
  const article = require("./vDoc.json");
  engine.ui.getComp("commonUi","articleComp").init(panelId,{
    article:article
  });
}

const panelController = {
  init:init,
  ref:panelRef,
  type:type,
  panelName:panelName,
  trackers:trackers
};
engine.router.set.panelModule(pageName,contName,panelName,panelController);
module.exports = panelController;

},{"./vDoc.json":5}],5:[function(require,module,exports){
module.exports={
  "template": [
    "2iyza9rkkm1pgl2c",
    "2iyza7ekkm2stknj"
  ],
  "rows": {
    "2iyza9rkkm1pgl2c": {
      "id": "2iyza9rkkm1pgl2c",
      "template": [
        "2iyza9rkkm1pgmf8",
        "2iyza9rkkm1pgwzx"
      ],
      "containers": {
        "2iyza9rkkm1pgmf8": {
          "id": "2iyza9rkkm1pgmf8",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.common.tell"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api is used for debugging a vegana element you can make a bunch of tell logs and see what builds and what doesn't to find a bug his api only logs to the console if the log controller is true"
            }
          },
          "style": {
            "width": "90%"
          }
        }
      }
    },
    "2iyza7ekkm2stknj": {
      "id": "2iyza7ekkm2stknj",
      "template": [
        "2iyza7ekkm2stlnb"
      ],
      "containers": {
        "2iyza7ekkm2stlnb": {
          "id": "2iyza7ekkm2stlnb",
          "field": {
            "type": "code",
            "data": {
              "value": "\n\nconst log = true;\n\nengine.common.tell(\"i am here\",log);\n\n//output = \">>> i am here\""
            }
          },
          "style": {
            "width": "90%"
          }
        }
      }
    }
  }
}
},{}]},{},[1]);
