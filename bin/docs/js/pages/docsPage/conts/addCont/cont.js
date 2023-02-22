(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-add';
const pageName = 'docsPage';
const contName = 'addCont';

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
  if(!data.panel){data.panel = 'objectPanel';}

  const objectPanel = require("./panels/objectPanel/panel");
  const functionPanel = require("./panels/functionPanel/panel");
  const compPanel = require("./panels/compPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","addCont",data.panel);
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

},{"./panels/compPanel/panel":2,"./panels/functionPanel/panel":4,"./panels/objectPanel/panel":6}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-comp';
const pageName = 'docsPage';
const contName = 'addCont';
const panelName = 'compPanel';

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
  title:'Vegana Api : Engine Add Comp',
  meta:[
    {
      name:'description',
      content:'How to use vegana components multiple times?'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,add,comp'
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
    "2iyza140km2phg54",
    "2iyza9rkkm1ply8b"
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
              "value": "engine.add.comp"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "some components are required to be built across apps like user page links are required to be built across pages and components this can bloat your code if you pass on component as a parameter to all those vegana components so to keep only one reference to this function in the memory you can share a component as a global object this reduces memory footprint and differentiates between generic js functions and vegana components to help you manage your code base."
            }
          },
          "style": {
            "width": "90%"
          }
        }
      }
    },
    "2iyza9rkkm1ply8b": {
      "id": "2iyza9rkkm1ply8b",
      "template": [
        "2iyza9rkkm1pmijn",
        "2iyzaa0ckm1povc2"
      ],
      "containers": {
        "2iyza9rkkm1pmijn": {
          "id": "2iyza9rkkm1pmijn",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "if you require some data multiple times and across multiple components this data can be stored in the global context."
            }
          },
          "style": {
            "width": "90%"
          }
        },
        "2iyzaa0ckm1povc2": {
          "id": "2iyzaa0ckm1povc2",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//example\n\n//import the file\nconst sampleComp = require(\"./comps/sampleComp/comp);\n\n//add the comp to global scope\nengine.add.comp(\"sampleComp \",sampleComp );\n\n//initiate the component\nengine.global.comp.sampleComp.init();"
            }
          },
          "style": {
            "width": "98%",
            "height": "300px"
          }
        }
      }
    },
    "2iyza140km2phg54": {
      "id": "2iyza140km2phg54",
      "template": [
        "2iyza140km2phpfj",
        "2iyza140km2phxxr"
      ],
      "containers": {
        "2iyza140km2phpfj": {
          "id": "2iyza140km2phpfj",
          "field": {
            "type": "heading",
            "data": {
              "value": "How to use vegana components multiple times?"
            }
          },
          "style": {
            "width": "90%"
          }
        },
        "2iyza140km2phxxr": {
          "id": "2iyza140km2phxxr",
          "field": {
            "type": "heading",
            "data": {
              "value": "How to share vegana components across vegana app?"
            }
          },
          "style": {
            "width": "90%"
          }
        }
      }
    }
  },
  "title": "engine.add.comp api",
  "keywords": "engine,add,comp,api",
  "discription": "this api gets a global comp."
}
},{}],4:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-function';
const pageName = 'docsPage';
const contName = 'addCont';
const panelName = 'functionPanel';

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

//these trackers will be triggered when this module is routed
const trackers = {
  title:'Vegana Api : Engine Add Function',
  meta:[
    {
      name:'description',
      content:'how to use functions multiple times from different places in vegana js?'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,add,function'
    }
  ],
  function_data:{},
  //function will be triggered with the function data as input when the module is routed to.
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
    "2iyza9rkkm1ply8b"
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
              "value": "engine.add.function"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "some functions are called from across components and are triggered by user events so to avoid clutter this code can only be decalred once and shared across your vegana app."
            }
          },
          "style": {
            "width": "90%"
          }
        }
      }
    },
    "2iyza9rkkm1ply8b": {
      "id": "2iyza9rkkm1ply8b",
      "template": [
        "2iyza140km2p1j3p",
        "2iyza9rkkm1plzsr",
        "2iyza9rkkm1pmijn",
        "2iyzaa0ckm1povc2"
      ],
      "containers": {
        "2iyza9rkkm1plzsr": {
          "id": "2iyza9rkkm1plzsr",
          "field": {
            "type": "heading",
            "data": {
              "value": "how to share functions vegana components?"
            }
          },
          "style": {
            "width": "90%"
          }
        },
        "2iyza9rkkm1pmijn": {
          "id": "2iyza9rkkm1pmijn",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this function is separate from engine.add.object api so you can save the data shared via that api safely please don't save functions in local memory its compromising."
            }
          },
          "style": {
            "width": "90%"
          }
        },
        "2iyzaa0ckm1povc2": {
          "id": "2iyzaa0ckm1povc2",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//example\nengine.add.function(\"whoAmI\",()=>{\n  return engine.global.object.user;\n});\n\nlet get = engine.global.function.whoAmI();\n\nconsole.log(get);"
            }
          },
          "style": {
            "width": "98%",
            "height": "300px"
          }
        },
        "2iyza140km2p1j3p": {
          "id": "2iyza140km2p1j3p",
          "field": {
            "type": "heading",
            "data": {
              "value": "how to use functions multiple times from different places in vegana js?"
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
},{}],6:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-object';
const pageName = 'docsPage';
const contName = 'addCont';
const panelName = 'objectPanel';

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

//these trackers will be triggered when this module is routed
const trackers = {
  title:'Vegana Api : Engine Add Object',
  meta:[
    {
      name:'description',
      content:'How to share data between components in vegana js?'
    },
    {
      name:'keywords',
      content:'vegana,api,add,object'
    }
  ],
  function_data:{},
  //function will be triggered with the function data as input when the module is routed to.
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
    "2iyza9rkkm1pgl2c",
    "2iyza9rkkm1ply8b"
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
              "value": "engine.add.object"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "GUI Applications require to share data between components which is used often instead of passing the data to every single component, it can be shared via a global context this data can be any valid Javascript Object ie JSON object, array, string or number. do not share functions with this api so you know any data can be saved safely if required, to share functions use engine.add.function api."
            }
          },
          "style": {
            "width": "90%"
          }
        }
      }
    },
    "2iyza9rkkm1ply8b": {
      "id": "2iyza9rkkm1ply8b",
      "template": [
        "2iyza9rkkm1plzsr",
        "2iyza9rkkm1pmijn",
        "2iyzaa0ckm1povc2"
      ],
      "containers": {
        "2iyza9rkkm1plzsr": {
          "id": "2iyza9rkkm1plzsr",
          "field": {
            "type": "heading",
            "data": {
              "value": "How to share data between components in vegana js?"
            }
          },
          "style": {
            "width": "90%"
          }
        },
        "2iyza9rkkm1pmijn": {
          "id": "2iyza9rkkm1pmijn",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "if you require some data multiple times and across multiple components this data can be stored in the global context."
            }
          },
          "style": {
            "width": "90%"
          }
        },
        "2iyzaa0ckm1povc2": {
          "id": "2iyzaa0ckm1povc2",
          "field": {
            "type": "code",
            "data": {
              "value": "//variables\nengine.add.object('key','value');\n\n\n//example\nengine.add.object(\"user\",{\n  name:'gzbakku',\n  id:1\n});\n\nlet get = engine.global.object.user;\n\nconsole.log(get);"
            }
          },
          "style": {
            "width": "98%",
            "height": "300px"
          }
        }
      }
    }
  }
}
},{}]},{},[1]);
