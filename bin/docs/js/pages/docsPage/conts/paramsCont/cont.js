(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-params';
const pageName = 'docsPage';
const contName = 'paramsCont';

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

  require("./panels/introPanel/panel");
  require("./panels/addPanel/panel");
  require("./panels/getPanel/panel");
  require("./panels/deletePanel/panel");
  require("./panels/native-getPanel/panel");
  require("./panels/native-pushPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","paramsCont",data.panel);
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

},{"./panels/addPanel/panel":2,"./panels/deletePanel/panel":4,"./panels/getPanel/panel":6,"./panels/introPanel/panel":8,"./panels/native-getPanel/panel":10,"./panels/native-pushPanel/panel":12}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-add';
const pageName = 'docsPage';
const contName = 'paramsCont';
const panelName = 'addPanel';

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
  title:'Vegana Api : Engine Params Add',
  meta:[
    {
      name:'description',
      content:'how to add a url parameter in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,params,add'
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
    "2iyza3qkkm5yv6if"
  ],
  "rows": {
    "2iyza3qkkm5yv6if": {
      "id": "2iyza3qkkm5yv6if",
      "template": [
        "2iyza3qkkm5yv7tr",
        "2iyza3qkkm5yv8of",
        "2iyza3qkkm5yv93r"
      ],
      "containers": {
        "2iyza3qkkm5yv7tr": {
          "id": "2iyza3qkkm5yv7tr",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.params.add"
            }
          }
        },
        "2iyza3qkkm5yv8of": {
          "id": "2iyza3qkkm5yv8of",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api adds a url parameter to current window url."
            }
          }
        },
        "2iyza3qkkm5yv93r": {
          "id": "2iyza3qkkm5yv93r",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//look at the url after running it\nengine.params.add(\"key\",\"value\");\n"
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
const panelRef = '-panel-delete';
const pageName = 'docsPage';
const contName = 'paramsCont';
const panelName = 'deletePanel';

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
  title:'Vegana Api : Engine Params Delete',
  meta:[
    {
      name:'description',
      content:'how to delete a url parameter in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,params,delete'
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
    "2iyza3qkkm5yv6if"
  ],
  "rows": {
    "2iyza3qkkm5yv6if": {
      "id": "2iyza3qkkm5yv6if",
      "template": [
        "2iyza3qkkm5yv7tr",
        "2iyza3qkkm5yv8of",
        "2iyza3qkkm5yv93r"
      ],
      "containers": {
        "2iyza3qkkm5yv7tr": {
          "id": "2iyza3qkkm5yv7tr",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.params.delete"
            }
          }
        },
        "2iyza3qkkm5yv8of": {
          "id": "2iyza3qkkm5yv8of",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api removes a given key from url parameters."
            }
          }
        },
        "2iyza3qkkm5yv93r": {
          "id": "2iyza3qkkm5yv93r",
          "field": {
            "type": "code",
            "data": {
              "value": "\nengine.params.add(\"key\",\"value\");\nengine.params.add(\"key1\",\"value1\");\n\nengine.params.delete(\"key\");\n"
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
const panelRef = '-panel-get';
const pageName = 'docsPage';
const contName = 'paramsCont';
const panelName = 'getPanel';

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
  title:'Vegana Api : Engine Params Get',
  meta:[
    {
      name:'description',
      content:'how to get a url parameter in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,params,get'
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
    "2iyza3qkkm5yv6if"
  ],
  "rows": {
    "2iyza3qkkm5yv6if": {
      "id": "2iyza3qkkm5yv6if",
      "template": [
        "2iyza3qkkm5yv7tr",
        "2iyza3qkkm5yv8of",
        "2iyza3qkkm5yv93r"
      ],
      "containers": {
        "2iyza3qkkm5yv7tr": {
          "id": "2iyza3qkkm5yv7tr",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.params.get"
            }
          }
        },
        "2iyza3qkkm5yv8of": {
          "id": "2iyza3qkkm5yv8of",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api provides all url parameters from current url."
            }
          }
        },
        "2iyza3qkkm5yv93r": {
          "id": "2iyza3qkkm5yv93r",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//look at the url when you run it\nengine.params.add(\"key\",\"value\");\n\nlet get = engine.params.get();\n\nconsole.log(get);\n"
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
const panelRef = '-panel-intro';
const pageName = 'docsPage';
const contName = 'paramsCont';
const panelName = 'introPanel';

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
  title:'Vegana Api : Engine Params Api Introduction',
  meta:[
    {
      name:'description',
      content:'introduction to vegana params api to manage url parameters and structure.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,params,introduction'
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
    "2iyza3qkkm5yv6if"
  ],
  "rows": {
    "2iyza3qkkm5yv6if": {
      "id": "2iyza3qkkm5yv6if",
      "template": [
        "2iyza3qkkm5yv7tr",
        "2iyza3qkkm5yv8of",
        "2iyza3qkkm5yv93r"
      ],
      "containers": {
        "2iyza3qkkm5yv7tr": {
          "id": "2iyza3qkkm5yv7tr",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.params.add"
            }
          }
        },
        "2iyza3qkkm5yv8of": {
          "id": "2iyza3qkkm5yv8of",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api adds a url parameter to current window url."
            }
          }
        },
        "2iyza3qkkm5yv93r": {
          "id": "2iyza3qkkm5yv93r",
          "field": {
            "type": "code",
            "data": {
              "value": "\nengine.params.add(\"key\",\"value\");\n"
            }
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
const panelRef = '-panel-native-get';
const pageName = 'docsPage';
const contName = 'paramsCont';
const panelName = 'native-getPanel';

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
  title:'Vegana Api : Engine Params Native Get',
  meta:[
    {
      name:'description',
      content:'how to parse and get url data in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,params,native,get'
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
    "2iyza3qkkm5yv6if"
  ],
  "rows": {
    "2iyza3qkkm5yv6if": {
      "id": "2iyza3qkkm5yv6if",
      "template": [
        "2iyza3qkkm5yv7tr",
        "2iyza3qkkm5yv8of",
        "2iyza3qkkm5yv93r"
      ],
      "containers": {
        "2iyza3qkkm5yv7tr": {
          "id": "2iyza3qkkm5yv7tr",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.params.native.get"
            }
          }
        },
        "2iyza3qkkm5yv8of": {
          "id": "2iyza3qkkm5yv8of",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api returns a parsed object for vegana router\n\nhttps://some.com/page1/cont1/panel1?key=value\n\nurl above all parts are displayed that are extracted from url.\n"
            }
          }
        },
        "2iyza3qkkm5yv93r": {
          "id": "2iyza3qkkm5yv93r",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst get_native = engine.params.native.get();\n\nconsole.log(get_native);\n\n//========================\n//out put is this object\n/*\n\n{\n  page:String,\n  cont:String,\n  panel:String,\n  custom:[],\n  params:{}\n}\n\n*/\n"
            }
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
const panelRef = '-panel-native-push';
const pageName = 'docsPage';
const contName = 'paramsCont';
const panelName = 'native-pushPanel';

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
  title:'Vegana Api : Engine Params Native Push',
  meta:[
    {
      name:'description',
      content:'how to add a native parameter to url in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,params,native,push'
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
    "2iyza3qkkm5yv6if"
  ],
  "rows": {
    "2iyza3qkkm5yv6if": {
      "id": "2iyza3qkkm5yv6if",
      "template": [
        "2iyza3qkkm5yv7tr",
        "2iyza3qkkm5yv8of",
        "2iyza3qkkm5yv93r"
      ],
      "containers": {
        "2iyza3qkkm5yv7tr": {
          "id": "2iyza3qkkm5yv7tr",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.params.native.push"
            }
          }
        },
        "2iyza3qkkm5yv8of": {
          "id": "2iyza3qkkm5yv8of",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api adds a value to url seperated by a backslash \"/\""
            }
          }
        },
        "2iyza3qkkm5yv93r": {
          "id": "2iyza3qkkm5yv93r",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//look at the url\nengine.params.native.push(\"add_native\");\n"
            }
          }
        }
      }
    }
  }
}
},{}]},{},[1]);
