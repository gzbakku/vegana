(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-view';
const pageName = 'docsPage';
const contName = 'viewCont';

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
  if(!data.panel){data.panel = 'showPanel';}

  require("./panels/showPanel/panel");
  require("./panels/hidePanel/panel");
  require("./panels/removePanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","viewCont",data.panel);
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

},{"./panels/hidePanel/panel":2,"./panels/removePanel/panel":4,"./panels/showPanel/panel":6}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-hide';
const pageName = 'docsPage';
const contName = 'viewCont';
const panelName = 'hidePanel';

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

/*

  Vegana Api : Engine View Remove Api

  vegana,api,engine,view,remove

  this api removes a dom element.

*/

const trackers = {
  title:'Vegana Api : Engine Sketch Colors Api',
  meta:[
    {
      name:'description',
      content:'how to manage and share colors in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,sketch,colors,add,get,manage'
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
              "value": "engine.view.hide api"
            }
          }
        },
        "2iyza7uskm7vock6": {
          "id": "2iyza7uskm7vock6",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api hides a html dom element by settings its display property to none. any element which uses custom display property should not use this api."
            }
          }
        },
        "2iyza7uskm7vocvq": {
          "id": "2iyza7uskm7vocvq",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//---------------------------\n//\tapi params\n//---------------------------\n/*\n\n\tengine.view.hide(parent_dom_element_id_string);\n\n*/\n\n\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    text:\"hide me\"\n});\n\nengine.make.button({\n\tparent:pageId,\n    value:\"click me\",\n    function:()=>{\n    \n    \t//---------------------------\n        //api\n    \tengine.view.hide(parent_div);\n        //---------------------------\n        \n    }\n});\n"
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
const panelRef = '-panel-remove';
const pageName = 'docsPage';
const contName = 'viewCont';
const panelName = 'removePanel';

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
  title:'Vegana Api : Engine Sketch Colors Api',
  meta:[
    {
      name:'description',
      content:'how to manage and share colors in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,sketch,colors,add,get,manage'
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
              "value": "engine.view.remove api"
            }
          }
        },
        "2iyza7uskm7vock6": {
          "id": "2iyza7uskm7vock6",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api removes a html dom element."
            }
          }
        },
        "2iyza7uskm7vocvq": {
          "id": "2iyza7uskm7vocvq",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//---------------------------\n//\tapi params\n//---------------------------\n/*\n\n\tengine.view.remove(parent_dom_element_id_string);\n\n*/\n\n\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    text:\"remove me\"\n});\n\nengine.make.button({\n\tparent:pageId,\n    value:\"click me\",\n    function:()=>{\n    \n    \t//---------------------------\n        //api\n    \tengine.view.remove(parent_div);\n        //---------------------------\n        \n        console.log({element:engine.get.element(parent_div)});\n        \n    }\n});\n\n\n"
            }
          }
        }
      }
    }
  }
}
},{}],6:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-show';
const pageName = 'docsPage';
const contName = 'viewCont';
const panelName = 'showPanel';

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
  title:'Vegana Api : Engine Sketch Colors Api',
  meta:[
    {
      name:'description',
      content:'how to manage and share colors in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,sketch,colors,add,get,manage'
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

},{"./vDoc.json":7}],7:[function(require,module,exports){
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
              "value": "engine.view.show api"
            }
          }
        },
        "2iyza7uskm7vock6": {
          "id": "2iyza7uskm7vock6",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api hides a html dom element by settings its display property to none. any element which uses custom display property should not use this api."
            }
          }
        },
        "2iyza7uskm7vocvq": {
          "id": "2iyza7uskm7vocvq",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//---------------------------\n//\tapi params\n//---------------------------\n/*\n\n\tengine.view.show(parent_dom_element_id_string);\n\n*/\n\n\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    text:\"hide me for 2 seconds\"\n});\n\nengine.make.button({\n\tparent:pageId,\n    value:\"click me\",\n    function:()=>{\n    \n    \tengine.view.hide(parent_div);\n        \n        setTimeout(()=>{\n        \n        \t//---------------------------\n        \t//api\n            \n    \t\t\tengine.view.show(parent_div);\n                \n        \t//---------------------------\n            \n        },2000);\n        \n    }\n});\n"
            }
          }
        }
      }
    }
  }
}
},{}]},{},[1]);
