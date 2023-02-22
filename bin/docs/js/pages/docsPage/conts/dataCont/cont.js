(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-data';
const pageName = 'docsPage';
const contName = 'dataCont';

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

  const introPanel = require("./panels/introPanel/panel");
  const getPanel = require("./panels/getPanel/panel");
  const setPanel = require("./panels/setPanel/panel");
  const resetPanel = require("./panels/resetPanel/panel");
  const deletePanel = require("./panels/deletePanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","dataCont",data.panel);
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

},{"./panels/deletePanel/panel":2,"./panels/getPanel/panel":4,"./panels/introPanel/panel":6,"./panels/resetPanel/panel":8,"./panels/setPanel/panel":10}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-delete';
const pageName = 'docsPage';
const contName = 'dataCont';
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
  title:'Vegana Api : Engine Data Delete',
  meta:[
    {
      name:'description',
      content:'delete data with vegana data api.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,data,delete'
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
              "value": "engine.data.delete"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api removes data from vegana data group"
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
              "value": "\nengine.data.set(\"username\",\"gzbakku\",\"local\");\n\n/*\n this api takes key and vegana data group as parameters.\n*/\n\n//-----------------------------------------------\nengine.data.delete(\"username\",\"local\");\n//-----------------------------------------------\n"
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
const panelRef = '-panel-get';
const pageName = 'docsPage';
const contName = 'dataCont';
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
  title:'Vegana Api : Engine Data Get',
  meta:[
    {
      name:'description',
      content:'get data with vegana data api.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,data,get'
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
              "value": "engine.data.get"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this apis is used to extract data from vegana storage type like mem, local and session."
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
              "value": "\n\nengine.data.set(\"username\",\"gzbakku\",\"local\");\n\n/*\n this api takes key and vegana data group to extract the data ie local, session and mem.\n*/\n\nlet username = engine.data.get(\"username\",\"local\");\n\nconsole.log(username);"
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
const panelRef = '-panel-intro';
const pageName = 'docsPage';
const contName = 'dataCont';
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
  title:'Vegana Api : Engine Data Introduction',
  meta:[
    {
      name:'description',
      content:'introduction to vegana data api.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,data,intro,introduction'
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
    "2iyza7ekkm2twp57",
    "2iyza7ekkm2u0vhl",
    "2iyza7ekkm2udfrg"
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
              "value": "Vegana Data Api"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "vegana data api is basic data storage system for vegana app, it is based on web storage system with local and session data groups but with an addition of mem group. "
            }
          },
          "style": {
            "width": "90%"
          }
        }
      }
    },
    "2iyza7ekkm2twp57": {
      "id": "2iyza7ekkm2twp57",
      "template": [
        "2iyza7ekkm2twrlv",
        "2iyza7ekkm2tx2nu"
      ],
      "containers": {
        "2iyza7ekkm2twrlv": {
          "id": "2iyza7ekkm2twrlv",
          "field": {
            "type": "heading",
            "data": {
              "value": "vegana data local group"
            }
          }
        },
        "2iyza7ekkm2tx2nu": {
          "id": "2iyza7ekkm2tx2nu",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "local group is same as localStorage on web this data persist on the app until you delete it or the user machine removes it forcefully. this data can be removed by user or the user machine admin so any mission critical data like rsa keys should be backed up to permanent and safe storage. this data can be accessed and updated across sessions windows or tabs."
            }
          },
          "style": {
            "width": "90%"
          }
        }
      }
    },
    "2iyza7ekkm2u0vhl": {
      "id": "2iyza7ekkm2u0vhl",
      "template": [
        "2iyza7ekkm2u0x0h",
        "2iyza7ekkm2u13s1"
      ],
      "containers": {
        "2iyza7ekkm2u0x0h": {
          "id": "2iyza7ekkm2u0x0h",
          "field": {
            "type": "heading",
            "data": {
              "value": "vegana data session group"
            }
          }
        },
        "2iyza7ekkm2u13s1": {
          "id": "2iyza7ekkm2u13s1",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "session group is same as sessionStorage on web this data persist on the app until user closes the session. Session is a set of active instances of a app so until all tabs or windows the data will persist in session group. This data can be accessed and updated across sessions windows or tabs."
            }
          },
          "style": {
            "width": "90%"
          }
        }
      }
    },
    "2iyza7ekkm2udfrg": {
      "id": "2iyza7ekkm2udfrg",
      "template": [
        "2iyza7ekkm2udgnh",
        "2iyza7ekkm2udrjo"
      ],
      "containers": {
        "2iyza7ekkm2udgnh": {
          "id": "2iyza7ekkm2udgnh",
          "field": {
            "type": "heading",
            "data": {
              "value": "vegana data mem group"
            }
          }
        },
        "2iyza7ekkm2udrjo": {
          "id": "2iyza7ekkm2udrjo",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "mem group stores the data in instance scope so when the user closes the instance ie tab or window the data is removed."
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
const panelRef = '-panel-reset';
const pageName = 'docsPage';
const contName = 'dataCont';
const panelName = 'resetPanel';

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
  title:'Vegana Api : Engine Data Reset',
  meta:[
    {
      name:'description',
      content:'update data with vegana data api.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,data,reset'
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
              "value": "engine.data.reset"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api takes and updates the data in given vegana memory group if the key doesn't exists in the mem group it will be created."
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
              "value": "\nengine.data.set(\"username\",\"gzbakku\",\"local\");\n\n//this fails\nengine.data.set(\"username\",\"gzb\",\"local\");\n\n/*\n this api takes key, data and vegana data group as parameters.\n*/\n\n//-----------------------------------------------\nengine.data.reset(\"username\",\"gzb\",\"local\");\n//-----------------------------------------------\n\nlet username = engine.data.get(\"username\",\"local\");\n\nconsole.log(username);"
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
const panelRef = '-panel-set';
const pageName = 'docsPage';
const contName = 'dataCont';
const panelName = 'setPanel';

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
  title:'Vegana Api : Engine Data Set',
  meta:[
    {
      name:'description',
      content:'save data with vegana data api.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,data,set'
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
              "value": "engine.data.set"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api takes and saves the data in given vegana memory group but only one key can be set at once with this api so if any key already exists in the memory group if fails to set the data."
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
              "value": "\n/*\n this api takes key, data and vegana data group as parameters.\n*/\n\n//-----------------------------------------------\nengine.data.set(\"username\",\"gzbakku\",\"local\");\n//-----------------------------------------------\n\nlet username = engine.data.get(\"username\",\"local\");\n\nconsole.log(username);"
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
