(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-static';
const pageName = 'docsPage';
const contName = 'staticCont';

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
  if(!data.panel){data.panel = 'onWebPanel';}

  require("./panels/onWebPanel/panel");
  require("./panels/publishPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","staticCont",data.panel);
  engine.router.navigate.to.panel(mod);

}

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

},{"./panels/onWebPanel/panel":2,"./panels/publishPanel/panel":4}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-onWeb';
const pageName = 'docsPage';
const contName = 'staticCont';
const panelName = 'onWebPanel';

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
  title:'Vegana Api : Engine Static onWeb Api',
  meta:[
    {
      name:'description',
      content:'how to execute a function on web with vegana static'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,static,onWeb,on,web'
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
    "2iyza7uskm7vo9oe"
  ],
  "rows": {
    "2iyza7uskm7vo9oe": {
      "id": "2iyza7uskm7vo9oe",
      "template": [
        "2iyza7uskm7voaxa",
        "2iyza7uskm7vock6",
        "2iyza7uskm7vocvq"
      ],
      "containers": {
        "2iyza7uskm7voaxa": {
          "id": "2iyza7uskm7voaxa",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.static.onWeb"
            }
          }
        },
        "2iyza7uskm7vock6": {
          "id": "2iyza7uskm7vock6",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api runs a function on web if you are using vegana static."
            }
          }
        },
        "2iyza7uskm7vocvq": {
          "id": "2iyza7uskm7vocvq",
          "field": {
            "type": "code",
            "data": {
              "value": "//==========================\n//\tapi params\n//==========================\n/*\n\n\tengine.static.onWeb(data,function);\n\n*/\n\nconst data = {\n\tname:\"gzbakku\"\n};\n\nengine.static.onWeb(data,(d)=>{\n\tconsole.log(d);\n});\n"
            }
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
const panelRef = '-panel-publish';
const pageName = 'docsPage';
const contName = 'staticCont';
const panelName = 'publishPanel';

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
  title:'Vegana Api : Engine Static publish Api',
  meta:[
    {
      name:'description',
      content:'how to publish or finish the page in vegana static.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,static,publish,build,finish,page'
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
    "2iyza7uskm7vo9oe"
  ],
  "rows": {
    "2iyza7uskm7vo9oe": {
      "id": "2iyza7uskm7vo9oe",
      "template": [
        "2iyza7uskm7voaxa",
        "2iyza7uskm7vock6",
        "2iyza7uskm7vocvq"
      ],
      "containers": {
        "2iyza7uskm7voaxa": {
          "id": "2iyza7uskm7voaxa",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.static.publish api"
            }
          }
        },
        "2iyza7uskm7vock6": {
          "id": "2iyza7uskm7vock6",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api publishes the page in vegana static when you are done processing it, we do not assume when the page is done you have to tell the api that page is ready to be published."
            }
          }
        },
        "2iyza7uskm7vocvq": {
          "id": "2iyza7uskm7vocvq",
          "field": {
            "type": "code",
            "data": {
              "value": "\nengine.static.publish();\n"
            }
          }
        }
      }
    }
  }
}
},{}]},{},[1]);
