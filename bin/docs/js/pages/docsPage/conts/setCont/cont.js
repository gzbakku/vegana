(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-set';
const pageName = 'docsPage';
const contName = 'setCont';

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
  if(!data.panel){data.panel = 'pageTitlePanel';}

  require("./panels/pageTitlePanel/panel");
  require("./panels/stylePanel/panel");
  require("./panels/inputPanel/panel");
  require("./panels/divPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","setCont",data.panel);
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

},{"./panels/divPanel/panel":2,"./panels/inputPanel/panel":4,"./panels/pageTitlePanel/panel":6,"./panels/stylePanel/panel":8}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-div';
const pageName = 'docsPage';
const contName = 'setCont';
const panelName = 'divPanel';

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
  title:'Vegana Api : Engine Set Div',
  meta:[
    {
      name:'description',
      content:'how to set div text and style.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,set,div,text,style'
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
    "2iyza8ggkm7un0ki"
  ],
  "rows": {
    "2iyza8ggkm7un0ki": {
      "id": "2iyza8ggkm7un0ki",
      "template": [
        "2iyza8ggkm7un1a2",
        "2iyza8ggkm7un1lu",
        "2iyza8ggkm7un1y2"
      ],
      "containers": {
        "2iyza8ggkm7un1a2": {
          "id": "2iyza8ggkm7un1a2",
          "field": {
            "type": "heading",
            "data": {
              "value": "vegana.set.div.text"
            }
          }
        },
        "2iyza8ggkm7un1lu": {
          "id": "2iyza8ggkm7un1lu",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api sets div inner value for any dom element."
            }
          }
        },
        "2iyza8ggkm7un1y2": {
          "id": "2iyza8ggkm7un1y2",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//=========================================\n/*\n\n\t//engine.set.div.text api params\n    \n    engine.set.div.text(dom_element_id_string,value_as_string);\n    \n*/        \n//=========================================        \n\nconst test_div = engine.make.div({\n\tparent:pageId,\n    text:\"original value\",\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\",\n            cursor:\"pointer\"\n        }\n    },\n    function:(id)=>{\n    \t\n        //=========================================\n        //\tengine.set.div.text api is here\n        \n        engine.set.div.text(id,\"new value\");\n        \n        //=========================================\n        \n    }\n});\n"
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
const panelRef = '-panel-input';
const pageName = 'docsPage';
const contName = 'setCont';
const panelName = 'inputPanel';

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
  title:'Vegana Api : Engine Set Input Value',
  meta:[
    {
      name:'description',
      content:'how to set input element value.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,set,input,value'
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
    "2iyza8ggkm7un0ki"
  ],
  "rows": {
    "2iyza8ggkm7un0ki": {
      "id": "2iyza8ggkm7un0ki",
      "template": [
        "2iyza8ggkm7un1a2",
        "2iyza8ggkm7un1lu",
        "2iyza8ggkm7un1y2"
      ],
      "containers": {
        "2iyza8ggkm7un1a2": {
          "id": "2iyza8ggkm7un1a2",
          "field": {
            "type": "heading",
            "data": {
              "value": "vegana.set.div.input"
            }
          }
        },
        "2iyza8ggkm7un1lu": {
          "id": "2iyza8ggkm7un1lu",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api sets element value for input type dom elements."
            }
          }
        },
        "2iyza8ggkm7un1y2": {
          "id": "2iyza8ggkm7un1y2",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//=========================================\n/*\n\n\t//engine.set.div.text api params\n    \n    engine.set.input.value(dom_element_id_string,value);\n    \n*/        \n//=========================================  \n\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\",\n        }\n    }\n});\n\nconst inputElement = engine.make.input({\n\tparent:parent_div,\n    placeholder:\"text goes here\",\n    type:'string',\n    draw:{\n    \tall:{\n        \tborder:\"5px solid pink\",\n            padding:\"10px\",\n        }\n    },\n    function:()=>{\n    \tclick_count = 0;\n    }\n});\n\nlet click_count = 0;\nengine.make.button({\n\tparent:parent_div,\n    value:\"click me\",\n\tfunction:()=>{\n    \tclick_count += 1;\n        \n        //=========================================\n        //api example\n\n            engine.set.input.value(inputElement,`click count : ${click_count}`);\n\n        //=========================================\n        \n        \n    },\n    draw:{\n    \tall:{\n        \tborder:\"5px solid pink\",\n            padding:\"10px\",\n        }\n    }\n});\n\n//=========================================\n//api goes here\n\n\tengine.set.input.value(inputElement,\"gzbakku\");\n\n//=========================================\n"
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
const panelRef = '-panel-pageTitle';
const pageName = 'docsPage';
const contName = 'setCont';
const panelName = 'pageTitlePanel';

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
  title:'Vegana Api : Engine Set Pagetitle',
  meta:[
    {
      name:'description',
      content:'how to set page title in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,set,page,title,pageTitle'
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
    "2iyza8ggkm7un0ki"
  ],
  "rows": {
    "2iyza8ggkm7un0ki": {
      "id": "2iyza8ggkm7un0ki",
      "template": [
        "2iyza8ggkm7un1a2",
        "2iyza8ggkm7un1lu",
        "2iyza8ggkm7un1y2"
      ],
      "containers": {
        "2iyza8ggkm7un1a2": {
          "id": "2iyza8ggkm7un1a2",
          "field": {
            "type": "heading",
            "data": {
              "value": "vegana.set.pageTitle"
            }
          }
        },
        "2iyza8ggkm7un1lu": {
          "id": "2iyza8ggkm7un1lu",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api sets html document page title.usually this is set by vegana module tracker from the title key but you can access this api directly to set page title."
            }
          }
        },
        "2iyza8ggkm7un1y2": {
          "id": "2iyza8ggkm7un1y2",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//look at title when you execute this.\n\nconst setTitle = engine.set.pageTitle(\"test title\");\n\nconsole.log({setTitle:setTitle});\n"
            }
          }
        }
      }
    }
  }
}
},{}],8:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-style';
const pageName = 'docsPage';
const contName = 'setCont';
const panelName = 'stylePanel';

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
  title:'Vegana Api : Engine Set Input Value',
  meta:[
    {
      name:'description',
      content:'how to set input element value.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,set,input,value'
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

},{"./vDoc.json":9}],9:[function(require,module,exports){
module.exports={
  "template": [
    "2iyza8ggkm7un0ki"
  ],
  "rows": {
    "2iyza8ggkm7un0ki": {
      "id": "2iyza8ggkm7un0ki",
      "template": [
        "2iyza8ggkm7un1a2",
        "2iyza8ggkm7un1lu",
        "2iyza8ggkm7un1y2"
      ],
      "containers": {
        "2iyza8ggkm7un1a2": {
          "id": "2iyza8ggkm7un1a2",
          "field": {
            "type": "heading",
            "data": {
              "value": "vegana.set.style"
            }
          }
        },
        "2iyza8ggkm7un1lu": {
          "id": "2iyza8ggkm7un1lu",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api updates a dom element style property."
            }
          }
        },
        "2iyza8ggkm7un1y2": {
          "id": "2iyza8ggkm7un1y2",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//=========================================\n/*\n\n\t//engine.set.style api params\n    \n    engine.set.style(dom_element_id_string,style_json_object);\n    \n*/        \n//=========================================  \n\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\",\n        }\n    }\n});\n\nengine.make.button({\n\tparent:parent_div,\n    value:\"click me\",\n\tfunction:()=>{\n        //=========================================\n        //api example goes here\n\n            engine.set.style(parent_div,{\n            \tborder:\"5px solid pink\",\n                padding:\"10px\"\n            });\n\n        //=========================================\n    }\n});\n\n\n"
            }
          }
        }
      }
    }
  }
}
},{}]},{},[1]);
