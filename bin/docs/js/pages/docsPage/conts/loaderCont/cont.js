(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-loader';
const pageName = 'docsPage';
const contName = 'loaderCont';

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
  if(!data.panel){data.panel = 'load-imagePanel';}

  require("./panels/load-imagePanel/panel");
  require("./panels/load-wasmPanel/panel");
  require("./panels/load-jsPanel/panel");

  require("./panels/load-compPanel/panel");
  require("./panels/load-pagePanel/panel");
  require("./panels/load-contPanel/panel");
  require("./panels/load-panelPanel/panel");
  require("./panels/load-sassPackPanel/panel");

  require("./panels/cssPanel/panel");

  require("./panels/hook-compPanel/panel");
  require("./panels/hook-pagePanel/panel");
  require("./panels/hook-contPanel/panel");
  require("./panels/hook-panelPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","loaderCont",data.panel);
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

},{"./panels/cssPanel/panel":2,"./panels/hook-compPanel/panel":4,"./panels/hook-contPanel/panel":6,"./panels/hook-pagePanel/panel":8,"./panels/hook-panelPanel/panel":10,"./panels/load-compPanel/panel":12,"./panels/load-contPanel/panel":14,"./panels/load-imagePanel/panel":16,"./panels/load-jsPanel/panel":18,"./panels/load-pagePanel/panel":20,"./panels/load-panelPanel/panel":22,"./panels/load-sassPackPanel/panel":24,"./panels/load-wasmPanel/panel":26}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-css';
const pageName = 'docsPage';
const contName = 'loaderCont';
const panelName = 'cssPanel';

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
  title:'Vegana Api : Engine Loader Css',
  meta:[
    {
      name:'description',
      content:'how to load a css file in vegana app.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,loader,css'
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
              "value": "engine.loader.load.css"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api loads a lazy css file either from vegana app directory or from a valid url and takes location and is_link as arguments."
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
              "value": "\n\n/*===============================\n\targuments\n===============================*/\n\nengine.loader.load.css(path,is_link);\n\n//path is relative path or url\n//is_link tells the api should the path be considered relative or a independent url.\n//this api returns a promise \n\n/*===============================\n\tload from external valid url\n===============================*/\n\nengine.loader.load.css(\"https://some.com/some.css\",true);\n\n/*===============================\n\tload from vegana app css directory\n\tfile is location at vegana_project_directory/css/some/sample.css\n===============================*/\n\nengine.loader.load.css(\"some/sample.css\",false);\n"
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
const panelRef = '-panel-hook-comp';
const pageName = 'docsPage';
const contName = 'loaderCont';
const panelName = 'hook-compPanel';

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
  title:'Vegana Api : Engine Loader Hook Comp',
  meta:[
    {
      name:'description',
      content:'how to tigger a function when a lazy comp is loaded.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,loader,hook,comp'
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
              "value": "engine.loader.hook.comp"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api triggers a given function when the native vegana comp module is loaded and ready for use."
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
              "value": "//this takes a object with comp and function keys\n//comp should be a full valid name of a native vegana comp module\n//function should be a valid js function\n\nengine.loader.hook.comp({\n\tcomp:\"sampleComp\",\n\tfunction:()=>{\n\t\tconsole.log(\"comp loaded successfully.\");\n\t}\n});"
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
const panelRef = '-panel-hook-cont';
const pageName = 'docsPage';
const contName = 'loaderCont';
const panelName = 'hook-contPanel';

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
  title:'Vegana Api : Engine Loader Hook Cont',
  meta:[
    {
      name:'description',
      content:'how to tigger a function when a lazy cont is loaded.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,loader,hook,cont'
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
              "value": "engine.loader.hook.cont"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api triggers a given function when the native vegana cont module is loaded and ready for use."
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
              "value": "\n\n\n//this takes a object with page, cont and function keys\n//page should be a full valid name of a native vegana page module\n//cont should be a full valid name of a native vegana cont module\n//function should be a valid js function\n\nengine.loader.hook.cont({\n\tpage:\"samplePage\",\n\tcont:'sampleCont',\n\tfunction:()=>{\n\t\tconsole.log(\"cont loaded successfully.\");\n\t}\n});\n"
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
const panelRef = '-panel-hook-page';
const pageName = 'docsPage';
const contName = 'loaderCont';
const panelName = 'hook-pagePanel';

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
  title:'Vegana Api : Engine Loader Hook Page',
  meta:[
    {
      name:'description',
      content:'how to tigger a function when a lazy page is loaded.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,loader,hook,page'
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
              "value": "engine.loader.hook.page"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api triggers a given function when the native vegana page module is loaded and ready for use."
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
              "value": "\n\n\n//this takes a object with page and function keys\n//page should be a full valid name of a native vegana page module\n//function should be a valid js function\n\nengine.loader.hook.page({\n\tpage:\"samplePage\",\n\tfunction:()=>{\n\t\tconsole.log(\"page loaded successfully.\");\n\t}\n});\n"
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
const panelRef = '-panel-hook-panel';
const pageName = 'docsPage';
const contName = 'loaderCont';
const panelName = 'hook-panelPanel';

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
  title:'Vegana Api : Engine Loader Hook Panel',
  meta:[
    {
      name:'description',
      content:'how to tigger a function when a lazy panel is loaded.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,loader,hook,panel'
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
              "value": "engine.loader.hook.panel"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api triggers a given function when the native vegana panel module is loaded and ready for use."
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
              "value": "\n\n\n//this takes a object with page, cont, panel and function keys\n//page should be a full valid name of a native vegana page module\n//cont should be a full valid name of a native vegana cont module\n//panel should be a full valid name of a native vegana panel module\n//function should be a valid js function\n\nengine.loader.hook.panel({\n\tpage:\"samplePage\",\n\tcont:'sampleCont',\n\tpanel:\"samplePanel\",\n\tfunction:()=>{\n\t\tconsole.log(\"panel loaded successfully.\");\n\t}\n});\n"
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
const panelRef = '-panel-load-comp';
const pageName = 'docsPage';
const contName = 'loaderCont';
const panelName = 'load-compPanel';

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
  title:'Vegana Api : Engine Loader Load Comp',
  meta:[
    {
      name:'description',
      content:'how to load a lazy comp module in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,loader,load,comp'
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
              "value": "engine.loader.load.comp"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api loads the lazy comp module in vegana js"
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
              "value": "\n\nengine.loader.load.comp(compName,load_css)\n\n//compname should be full compName\n//load css will load the lazy css along with the module it is false by default\n\n//this returns a boolean\nlet loadComp = await engine.loader.load.comp(\"sampleComp\",true);\n\n//output is true if it loads offcourse\n"
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
const panelRef = '-panel-load-cont';
const pageName = 'docsPage';
const contName = 'loaderCont';
const panelName = 'load-contPanel';

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
  title:'Vegana Api : Engine Loader Load Cont',
  meta:[
    {
      name:'description',
      content:'how to load a lazy cont module in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,loader,load,cont'
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
              "value": "engine.loader.load.cont"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api loads the lazy cont module in vegana js."
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
              "value": "\n\nengine.loader.load.cont(pageName,contName,load_css)\n\n//pageName should be full pageName\n//contName should be full contName\n//load css will load the lazy css along with the module it is false by default\n\n//this returns a boolean\nlet loadCont = await engine.loader.load.cont(\"samplePage\",\"sampleCont\",true);\n\n//output is true if it loads offcourse\n"
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
const panelRef = '-panel-load-image';
const pageName = 'docsPage';
const contName = 'loaderCont';
const panelName = 'load-imagePanel';

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
  title:'Vegana Api : Engine Loader Load Image',
  meta:[
    {
      name:'description',
      content:'how to load a image before it is displayed to the user.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,loader,load,image'
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
              "value": "engine.loader.load.image"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api loads a image before it is showed to the user ie the user might be going through some tutorial and you can load the images needed next before they are deployed on to the user context."
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
              "value": "//this api takes the full image url \n\nengine.loader.load.image(\"https://some.com/image.png\");\n\n//this image will be cached to use later."
            }
          },
          "style": {}
        }
      }
    }
  }
}
},{}],18:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-load-js';
const pageName = 'docsPage';
const contName = 'loaderCont';
const panelName = 'load-jsPanel';

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
  title:'Vegana Api : Engine Loader Load Js',
  meta:[
    {
      name:'description',
      content:'how to lazy load a js file in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,loader,load,js'
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
              "value": "engine.loader.load.js"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api lazy loads a js file either form a valid url or from your vegana app js directory"
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
              "value": "\n\n/*================================\n\tload js file from vegana app directory\n\tthis file is placed in vegana_project_directory/js/some/random.js\n================================*/\nconst load_native_vegana_wasm_module = await engine.loader.load.js({\n\tid;'any_id',//this is not required or is elective\n\ttype:'local',\n\turl:'some/random.js'\n})\n.then(()=>{\n\treturn true;\n})\n.catch(()=>{\n\treturn false;\n});\n\n/*================================\n\tload external js file\n================================*/\nconst load_external_wasm_module = await engine.loader.load.js({\n\ttype:'url',\n\turl:'https://some.com/some.js'\n})\n.then(()=>{\n\treturn true;\n})\n.catch(()=>{\n\treturn false;\n});\n\n\n/*================================\n\tinput object schema\n================================*/\n{\n\tid:{type:'string',elective:true},\n\ttype:{type:'string',options:['local','url']},\n\turl:{type:'string',max:4048},\n\tmodule:{type:'boolean',elective:true}        \n}\n"
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
},{}],20:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-load-page';
const pageName = 'docsPage';
const contName = 'loaderCont';
const panelName = 'load-pagePanel';

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
  title:'Vegana Api : Engine Loader Load Page',
  meta:[
    {
      name:'description',
      content:'how to load a lazy page module in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,loader,load,page'
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

},{"./vDoc.json":21}],21:[function(require,module,exports){
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
              "value": "engine.loader.load.page"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api loads lazy page module in vegana js."
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
              "value": "\n\nengine.loader.load.page(pageName,load_css)\n\n//pageName should be full pageName\n//load css will load the lazy css along with the module it is false by default\n\n//this returns a boolean\nlet loadPage = await engine.loader.load.page(\"samplePage\",true);\n\n//output is true if it loads offcourse\n"
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
},{}],22:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-load-panel';
const pageName = 'docsPage';
const contName = 'loaderCont';
const panelName = 'load-panelPanel';

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
  title:'Vegana Api : Engine Loader Load Panel',
  meta:[
    {
      name:'description',
      content:'how to load a lazy panel module in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,loader,load,panel'
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

},{"./vDoc.json":23}],23:[function(require,module,exports){
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
              "value": "engine.loader.load.panel"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api loads a lazy panel module in vegana js."
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
              "value": "\n\nengine.loader.load.panel(pageName,contName,panelName,load_css)\n\n//pageName should be full pageName\n//contName should be full contName\n//panelName should be full panelName\n//load css will load the lazy css along with the module it is false by default\n\n//this returns a boolean\nlet loadPanel = await engine.loader.load.cont(\"samplePage\",\"sampleCont\",\"samplePanel\",true);\n\n//output is true if it loads offcourse\n"
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
},{}],24:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-load-sassPack';
const pageName = 'docsPage';
const contName = 'loaderCont';
const panelName = 'load-sassPackPanel';

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
  title:'Vegana Api : Engine Loader Load SassPack',
  meta:[
    {
      name:'description',
      content:'how to load a lazy sassPack module in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,loader,load,sassPack'
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

},{"./vDoc.json":25}],25:[function(require,module,exports){
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
              "value": "engine.loader.load.sassPack"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api loads a lazy native sassPack module in vegana js."
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
              "value": "\n\n//make new sass pack\n/*\n\n\t$ vegana generate sass sample\n\n*/\n\nengine.loader.load.sassPack(sassPackName)\n\n//sassPackName should be full sassPackName\n\n//this returns a promise\nlet loadSassPack = await engine.loader.load.sassPack(\"samplePack\")\n.then(()=>{\n\treturn true;\n})\n.catch(()=>{\n\treturn false;\n});\n\n//output is true if it loads correctly\n"
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
},{}],26:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-load-wasm';
const pageName = 'docsPage';
const contName = 'loaderCont';
const panelName = 'load-wasmPanel';

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
  title:'Vegana Api : Engine Loader Load Wasm',
  meta:[
    {
      name:'description',
      content:'how to load a lazy wasm module in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,loader,load,wasm'
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

},{"./vDoc.json":27}],27:[function(require,module,exports){
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
              "value": "engine.loader.load.wasm"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api loads a native vegana wasm module written using rust and takes a object as argument and returns a promise you will have to catch the error if any."
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
              "value": "\n\n/*================================\n\tload native vegana rust wasm module\n================================*/\nconst load_native_vegana_wasm_module = await engine.loader.load.wasm({\n\ttype:'local',\n\tmodule:'module_name'\n})\n.then(()=>{\n\treturn true;\n})\n.catch(()=>{\n\treturn false;\n});\n\n/*================================\n\tload external rust wasm module\n================================*/\nconst load_external_wasm_module = await engine.loader.load.wasm({\n\ttype:'url',\n\turl:'https://some.com/some.wasm'\n})\n.then(()=>{\n\treturn true;\n})\n.catch(()=>{\n\treturn false;\n});\n\n"
            }
          },
          "style": {
            "width": "95%"
          }
        }
      }
    }
  }
}

},{}]},{},[1]);
