(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-get';
const pageName = 'docsPage';
const contName = 'getCont';

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
  if(!data.panel){data.panel = 'introPanel';}

  const osPanel = require("./panels/osPanel/panel");
  const hostPanel = require("./panels/hostPanel/panel");

  const elementPanel = require("./panels/elementPanel/panel");
  const elementPositionPanel = require("./panels/elementPositionPanel/panel");

  const platformPanel = require("./panels/platformPanel/panel");

  const pageModulePanel = require("./panels/pageModulePanel/panel");
  const contModulePanel = require("./panels/contModulePanel/panel");
  const panelModulePanel = require("./panels/panelModulePanel/panel");

  const bodyPanel = require("./panels/bodyPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","getCont",data.panel);
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

},{"./panels/bodyPanel/panel":2,"./panels/contModulePanel/panel":4,"./panels/elementPanel/panel":6,"./panels/elementPositionPanel/panel":8,"./panels/hostPanel/panel":10,"./panels/osPanel/panel":12,"./panels/pageModulePanel/panel":14,"./panels/panelModulePanel/panel":16,"./panels/platformPanel/panel":18}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-body';
const pageName = 'docsPage';
const contName = 'getCont';
const panelName = 'bodyPanel';

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
  title:'Vegana Api : Engine Get Body',
  meta:[
    {
      name:'description',
      content:'this api returns body height and width'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,get,body,height,width'
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
              "value": "engine.get.body"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api returns body height and width;"
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
              "value": "\nconst height = engine.get.body.height();\n\nconsole.log(height);\n\nconst width = engine.get.body.width();\n\nconsole.log(width);\n"
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
const panelRef = '-panel-contModule';
const pageName = 'docsPage';
const contName = 'getCont';
const panelName = 'contModulePanel';

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
  title:'Vegana Api : Engine Get Cont Module',
  meta:[
    {
      name:'description',
      content:'how to get vegana contModule'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,get,cont,module,contModule,Module'
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
              "value": "engine.get.contModule"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api returns a vegana contModule app and takes page name and cont name as arguments."
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
              "value": "\nlet contModule = engine.get.contModule(\"mainPage\",\"sampleCont\");\n\nconsole.log(contModule);"
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
const panelRef = '-panel-element';
const pageName = 'docsPage';
const contName = 'getCont';
const panelName = 'elementPanel';

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
  title:'Vegana Api : Engine Get Dom Element',
  meta:[
    {
      name:'description',
      content:'this api returns dom element by id.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,get,element,dom,id'
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
              "value": "engine.get.element"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this returns a dom element by id"
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
              "value": "\n\nconst sampleElement = engine.make.div({\n  parent:pageId,\n  text:'sampleElement'\n});\n\nconst sampleElementObject = engine.get.element(sampleElement);\n\nconsole.log(sampleElementObject);"
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
},{}],8:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-elementPosition';
const pageName = 'docsPage';
const contName = 'getCont';
const panelName = 'elementPositionPanel';

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
  title:'Vegana Api : Engine Get Dom Element Position',
  meta:[
    {
      name:'description',
      content:'this api returns a dom element position.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,get,element,position,dom'
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
              "value": "engine.get.elementPosition"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api returns a domRect element with position markers for the given element and takes element id as a parameter.\n\n"
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
              "value": "\nconst sampleElement = engine.make.div({\n  parent:pageId,\n  text:'sampleElement'\n});\n\nconst position = engine.get.elementPosition(sampleElement);\n\nconsole.log(position);\n\n//this object is returned\n/*\n  {\n    x : 121.5,\n    y : 50,\n    width : 440,\n    height : 240,\n    top : 50,\n    right : 561.5,\n    bottom : 290,\n    left : 121.5\n  }\n*/\n"
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
},{}],10:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-host';
const pageName = 'docsPage';
const contName = 'getCont';
const panelName = 'hostPanel';

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
  title:'Vegana Api : Engine Get Host',
  meta:[
    {
      name:'description',
      content:'this api returns website name on user is on.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,get,website,name,host'
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

},{"./vDoc.json":11}],11:[function(require,module,exports){
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
              "value": "engine.get.host"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this returns website the user is visiting sometimes you'll nned it if you are making a single app to run on multiple sites."
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
              "value": "\nconst host = engine.get.host();\n\nconsole.log(host);"
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
},{}],12:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-os';
const pageName = 'docsPage';
const contName = 'getCont';
const panelName = 'osPanel';

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
  title:'Vegana Api : Engine Get Os',
  meta:[
    {
      name:'description',
      content:'this api returns os the app is running on.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,get,os'
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

},{"./vDoc.json":13}],13:[function(require,module,exports){
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
              "value": "engine.get.os"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "get the operating system the app is running on."
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
              "value": "\n\nlet os = engine.get.os();\n\nconsole.log(os);"
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
},{}],14:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-pageModule';
const pageName = 'docsPage';
const contName = 'getCont';
const panelName = 'pageModulePanel';

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
  title:'Vegana Api : Engine Get Page Module',
  meta:[
    {
      name:'description',
      content:'how to get vegana pageModule'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,get,page,module,pageModule,Module'
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

},{"./vDoc.json":15}],15:[function(require,module,exports){
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
              "value": "engine.get.pageModule"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api returns a vegana pageModule app and takes page name as a argument."
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
              "value": "\n//this returns false if page is not available\nlet pageModule = engine.get.pageModule(\"mainPage\");\n\nconsole.log(pageModule);"
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
},{}],16:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-panelModule';
const pageName = 'docsPage';
const contName = 'getCont';
const panelName = 'panelModulePanel';

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
  title:'Vegana Api : Engine Get Panel Module',
  meta:[
    {
      name:'description',
      content:'how to get vegana panelModule'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,get,panel,module,panelModule,Module'
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

},{"./vDoc.json":17}],17:[function(require,module,exports){
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
              "value": "engine.get.panelModule"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api returns a vegana panelModule app and takes page name, cont name and panel name as arguments."
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
              "value": "\nlet panelModule = engine.get.pageModule(\"mainPage\",\"sampleCont\",\"samplePanel\");\n\nconsole.log(panelModule);"
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
},{}],18:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-platform';
const pageName = 'docsPage';
const contName = 'getCont';
const panelName = 'platformPanel';

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
  title:'Vegana Api : Engine Get Platform',
  meta:[
    {
      name:'description',
      content:'this api returns platform the app is running on.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,get,platform'
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

},{"./vDoc.json":19}],19:[function(require,module,exports){
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
              "value": "engine.get.platform"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api returns a platform the app is running on it can be pc or mobile if running on the browser or electron/cordova if the app is running as a app or static if the app is running on veganaStatic engine. it can take any one of those platforms as a parameter and return a boolean indicating if it is that platform or if no parameter is given it will return the platform it is running on.\n\nthe available platforms are pc, mobile, cordova, electron and static. "
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
              "value": "\n\n//platform is mobile\n\n//this returns true\nlet isMobile = engine.get.platform(\"mobile\");\n\n//this returns \"mobile\"\nlet platform = engine.get.platform();\n"
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
