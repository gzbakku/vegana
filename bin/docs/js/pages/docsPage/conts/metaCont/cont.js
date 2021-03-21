(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-meta';
const pageName = 'docsPage';
const contName = 'metaCont';

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
  require("./panels/updatePanel/panel");
  require("./panels/deletePanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","metaCont",data.panel);
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

},{"./panels/addPanel/panel":2,"./panels/deletePanel/panel":4,"./panels/introPanel/panel":6,"./panels/updatePanel/panel":8}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-add';
const pageName = 'docsPage';
const contName = 'metaCont';
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
  title:'Vegana Api : Engine Meta Add',
  meta:[
    {
      name:'description',
      content:'how to add a meta tag in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,meta,add'
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
    "2iyza3qkkm5xbtaw"
  ],
  "rows": {
    "2iyza3qkkm5xbtaw": {
      "id": "2iyza3qkkm5xbtaw",
      "template": [
        "2iyza3qkkm5xbueg",
        "2iyza3qkkm5xbvnk",
        "2iyza3qkkm5xbw0o"
      ],
      "containers": {
        "2iyza3qkkm5xbueg": {
          "id": "2iyza3qkkm5xbueg",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.meta.add"
            }
          }
        },
        "2iyza3qkkm5xbvnk": {
          "id": "2iyza3qkkm5xbvnk",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api adds meta tag to the html document."
            }
          }
        },
        "2iyza3qkkm5xbw0o": {
          "id": "2iyza3qkkm5xbw0o",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//this api cannot replace a meta tag to prevent clashes within the code.\nengine.meta.add({\n\tname:'keywords',\n    content:'vegana,js'\n});\n"
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
const contName = 'metaCont';
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
  title:'Vegana Api : Engine Meta Delete',
  meta:[
    {
      name:'description',
      content:'how to delete a meta tag in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,meta,delete'
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
    "2iyza3qkkm5xbtaw"
  ],
  "rows": {
    "2iyza3qkkm5xbtaw": {
      "id": "2iyza3qkkm5xbtaw",
      "template": [
        "2iyza3qkkm5xbueg",
        "2iyza3qkkm5xbvnk",
        "2iyza3qkkm5xbw0o"
      ],
      "containers": {
        "2iyza3qkkm5xbueg": {
          "id": "2iyza3qkkm5xbueg",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.meta.delete"
            }
          }
        },
        "2iyza3qkkm5xbvnk": {
          "id": "2iyza3qkkm5xbvnk",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api deletes a meta tags in the html document."
            }
          }
        },
        "2iyza3qkkm5xbw0o": {
          "id": "2iyza3qkkm5xbw0o",
          "field": {
            "type": "code",
            "data": {
              "value": "\nengine.meta.delete(\"keywords\");\n"
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
const panelRef = '-panel-intro';
const pageName = 'docsPage';
const contName = 'metaCont';
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
  title:'Vegana Api : Engine Meta Intro',
  meta:[
    {
      name:'description',
      content:'what is meta api in vegana js, Introduction to vegana meta api.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,meta,intro'
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
    "2iyza3qkkm5xbtaw"
  ],
  "rows": {
    "2iyza3qkkm5xbtaw": {
      "id": "2iyza3qkkm5xbtaw",
      "template": [
        "2iyza3qkkm5xbueg",
        "2iyza3qkkm5xbvnk"
      ],
      "containers": {
        "2iyza3qkkm5xbueg": {
          "id": "2iyza3qkkm5xbueg",
          "field": {
            "type": "heading",
            "data": {
              "value": "Introduction to Vegana Meta Api"
            }
          }
        },
        "2iyza3qkkm5xbvnk": {
          "id": "2iyza3qkkm5xbvnk",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "\nmeta tags tells seach engines and browsers important information about your website like a brief description of the page important keywords now google has rich meta tags to extract relevent information so they can link to it more efficiently.\n\nthis api is deeply integrated in vegana module system each vegana module ie comp, page, cont and panel can set there own meta tags on the html page and are present in module tracker object present below the init function of a module, this setup helps you to not miss meta tags on your page.\n\nremember only set the important meta tags so you dont set these tags multiple times ie if the html page content is panel heavy only panel should set meta tags to avoid any irrelevent tags being set by page or cont modules.\n"
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
const panelRef = '-panel-update';
const pageName = 'docsPage';
const contName = 'metaCont';
const panelName = 'updatePanel';

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
  title:'Vegana Api : Engine Meta Update',
  meta:[
    {
      name:'description',
      content:'how to update a meta tag in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,meta,update'
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
    "2iyza3qkkm5xbtaw"
  ],
  "rows": {
    "2iyza3qkkm5xbtaw": {
      "id": "2iyza3qkkm5xbtaw",
      "template": [
        "2iyza3qkkm5xbueg",
        "2iyza3qkkm5xbvnk",
        "2iyza3qkkm5xbw0o"
      ],
      "containers": {
        "2iyza3qkkm5xbueg": {
          "id": "2iyza3qkkm5xbueg",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.meta.update"
            }
          }
        },
        "2iyza3qkkm5xbvnk": {
          "id": "2iyza3qkkm5xbvnk",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api updates a meta tag in the html document."
            }
          }
        },
        "2iyza3qkkm5xbw0o": {
          "id": "2iyza3qkkm5xbw0o",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//if meta tag doesnt exists on the html page it will be created\nengine.meta.update({\n\tname:'keywords',\n    content:'vegana,js'\n});\n"
            }
          }
        }
      }
    }
  }
}
},{}]},{},[1]);
