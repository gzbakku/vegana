(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-wet';
const pageName = 'docsPage';
const contName = 'wetCont';

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
  if(!data.panel){data.panel = 'api-getPanel';}

  require("./panels/api-getPanel/panel");
  require("./panels/api-setPanel/panel");
  require("./panels/api-queryPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","wetCont",data.panel);
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

},{"./panels/api-getPanel/panel":2,"./panels/api-queryPanel/panel":4,"./panels/api-setPanel/panel":6}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-api-get';
const pageName = 'docsPage';
const contName = 'wetCont';
const panelName = 'api-getPanel';

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

  Vegana Api : Engine Wet Api Get Subapi

  this api fetches the current active wet base api location

  engine,api,wet,subapi,api,get

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
              "value": "engine.wet.api.get api"
            }
          }
        },
        "2iyza7uskm7vock6": {
          "id": "2iyza7uskm7vock6",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api fetches the active wet api base location."
            }
          }
        },
        "2iyza7uskm7vocvq": {
          "id": "2iyza7uskm7vocvq",
          "field": {
            "type": "code",
            "data": {
              "value": "\nengine.wet.api.set(\"https://some.com\")\n\nconst base_api_location = engine.wet.api.get();\n\nconsole.log({base_api_location:base_api_location});"
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
const panelRef = '-panel-api-query';
const pageName = 'docsPage';
const contName = 'wetCont';
const panelName = 'api-queryPanel';

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
              "value": "engine.wet.api.query api"
            }
          }
        },
        "2iyza7uskm7vock6": {
          "id": "2iyza7uskm7vock6",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api sends a wet request which includes the wet token - \"td-wet-token\" header from sessions api if available."
            }
          }
        },
        "2iyza7uskm7vocvq": {
          "id": "2iyza7uskm7vocvq",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//please support creators of \n/*\n\n\thttps://reqres.in\n\n*/\n\nengine.wet.api.set(\"https://reqres.in/\");\n\nconst query = await engine.wet.api.query({\n\tat:\"api/login\",\n    method:\"post\",//default is post\n    headers:{},//if any\n    body:{\n    \t\"email\": \"eve.holt@reqres.in\",\n        \"password\": \"cityslicka\"\n    }\n});\n\nconsole.log({query:query});\n"
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
const panelRef = '-panel-api-set';
const pageName = 'docsPage';
const contName = 'wetCont';
const panelName = 'api-setPanel';

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
              "value": "engine.wet.api.set api"
            }
          }
        },
        "2iyza7uskm7vock6": {
          "id": "2iyza7uskm7vock6",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api sets the base wet api location."
            }
          }
        },
        "2iyza7uskm7vocvq": {
          "id": "2iyza7uskm7vocvq",
          "field": {
            "type": "code",
            "data": {
              "value": "\nengine.wet.api.set(\"https://some.com\")\n\nconst base_api_location = engine.wet.api.get();\n\nconsole.log({base_api_location:base_api_location});"
            }
          }
        }
      }
    }
  }
}
},{}]},{},[1]);
