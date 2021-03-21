(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-binder';
const pageName = 'docsPage';
const contName = 'binderCont';

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
  if(!data.panel){data.panel = 'hoverPanel';}

  const hoverPanel = require("./panels/hoverPanel/panel");
  const clickPanel = require("./panels/clickPanel/panel");
  const filesPanel = require("./panels/filesPanel/panel");
  const textPanel = require("./panels/textPanel/panel");
  const numberPanel = require("./panels/numberPanel/panel");
  const valuePanel = require("./panels/valuePanel/panel");
  const activePanel = require("./panels/activePanel/panel");
  const booleanPanel = require("./panels/booleanPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","binderCont",data.panel);
  engine.router.navigate.new.panel(mod);

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

},{"./panels/activePanel/panel":2,"./panels/booleanPanel/panel":4,"./panels/clickPanel/panel":6,"./panels/filesPanel/panel":8,"./panels/hoverPanel/panel":10,"./panels/numberPanel/panel":12,"./panels/textPanel/panel":14,"./panels/valuePanel/panel":16}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-active';
const pageName = 'docsPage';
const contName = 'binderCont';
const panelName = 'activePanel';

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
  title:'Vegana Api : Engine Binder Active',
  meta:[
    {
      name:'description',
      content:'get checked property from a dom element.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,binder,active'
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
              "value": "engine.binder.active"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "get checked property from a dom element."
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
        "2iyza140km2qoizm"
      ],
      "containers": {
        "2iyza140km2qoizm": {
          "id": "2iyza140km2qoizm",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst checkbox = engine.make.input({\n  parent:pageId,  //change this to the id of parent dom element\n  type:'checkbox',\n});\n\nlet isActive = engine.binder.active(checkbox);\n\nconsole.log(isActive);"
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
},{}],4:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-boolean';
const pageName = 'docsPage';
const contName = 'binderCont';
const panelName = 'booleanPanel';

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
  title:'Vegana Api : Engine Binder Boolean',
  meta:[
    {
      name:'description',
      content:'this api was used before active api to check if checkbox is checked was added it just returns a JSON parsed object of the value from a dom element.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,binder,boolean'
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
              "value": "engine.binder.boolean"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api was used before active api to check if checkbox is checked was added it just returns a JSON parsed object of the value from a dom element."
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
        "2iyza140km2qoizm"
      ],
      "containers": {
        "2iyza140km2qoizm": {
          "id": "2iyza140km2qoizm",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst checkbox = engine.make.input({\n  parent:pageId,  //change this to the id of parent dom element\n  type:'checkbox'\n});\n\nlet checked = engine.binder.boolean(checkbox);\n\nconsole.log(checked);"
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
},{}],6:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-click';
const pageName = 'docsPage';
const contName = 'binderCont';
const panelName = 'clickPanel';

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
  title:'Vegana Api : Engine Binder Click',
  meta:[
    {
      name:'description',
      content:'trigger function on pointer click on a html dom element.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,binder,click'
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
              "value": "engine.binder.click"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "trigger function on pointer click on a html dom element."
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
        "2iyza140km2qoizm"
      ],
      "containers": {
        "2iyza140km2qoizm": {
          "id": "2iyza140km2qoizm",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst sample = engine.make.div({\n  parent:pageId,  //change this to the id of parent dom element\n  text:'hover over me'\n});\n\nengine.binder.click(sample,()=>{\n  console.log(\"i was clicked.\");\n});"
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
},{}],8:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-files';
const pageName = 'docsPage';
const contName = 'binderCont';
const panelName = 'filesPanel';

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
  title:'Vegana Api : Engine Binder Files',
  meta:[
    {
      name:'description',
      content:'get selected files object from a files input field.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,binder,files'
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
              "value": "engine.binder.files"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "get selected files object from a files input field."
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
        "2iyza140km2qoizm"
      ],
      "containers": {
        "2iyza140km2qoizm": {
          "id": "2iyza140km2qoizm",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst filesField = engine.make.input({\n  parent:pageId,  //change this to the id of parent dom element\n  type:'files',\n  placeholder:'give me some files'\n});\n\nlet selected_files = engine.binder.files(filesField );\n\nconsole.log(selected_files );"
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
},{}],10:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-hover';
const pageName = 'docsPage';
const contName = 'binderCont';
const panelName = 'hoverPanel';

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
  title:'Vegana Api : Engine Binder Hover',
  meta:[
    {
      name:'description',
      content:'trigger function on mouse hover or mouse enter on a html dom element.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,binder,hover'
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
              "value": "engine.binder.hover"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "trigger function on mouse hover or mouse enter on a html dom element."
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
        "2iyza140km2qoizm"
      ],
      "containers": {
        "2iyza140km2qoizm": {
          "id": "2iyza140km2qoizm",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst sample = engine.make.div({\n  parent:pageId,  //change this to the id of parent dom element\n  text:'hover over me'\n});\n\nengine.binder.hover(sample,()=>{\n  console.log(\"i am in context\");\n});"
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
},{}],12:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-number';
const pageName = 'docsPage';
const contName = 'binderCont';
const panelName = 'numberPanel';

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
  title:'Vegana Api : Engine Binder Number',
  meta:[
    {
      name:'description',
      content:'get number from a input field.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,binder,number'
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
              "value": "engine.binder.number"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "get number from a input field."
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
        "2iyza140km2qoizm"
      ],
      "containers": {
        "2iyza140km2qoizm": {
          "id": "2iyza140km2qoizm",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst numberField = engine.make.input({\n  parent:pageId,  //change this to the id of parent dom element\n  type:'number',\n  placeholder:'number goes here'\n});\n\nlet numberInput = engine.binder.number(numberField);\n\nconsole.log(numberInput);"
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
},{}],14:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-text';
const pageName = 'docsPage';
const contName = 'binderCont';
const panelName = 'textPanel';

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
  title:'Vegana Api : Engine Binder Text',
  meta:[
    {
      name:'description',
      content:'get string input from a input field.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,binder,text'
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
              "value": "engine.binder.text"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "get string input from a input field."
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
        "2iyza140km2qoizm"
      ],
      "containers": {
        "2iyza140km2qoizm": {
          "id": "2iyza140km2qoizm",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst textField = engine.make.input({\n  parent:pageId,  //change this to the id of parent dom element\n  type:'string',\n  placeholder:'text goes here'\n});\n\nlet stringInput = engine.binder.text(textField);\n\nconsole.log(stringInput);"
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
},{}],16:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-value';
const pageName = 'docsPage';
const contName = 'binderCont';
const panelName = 'valuePanel';

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
  title:'Vegana Api : Engine Binder Value',
  meta:[
    {
      name:'description',
      content:'get value or innerHtml property value from a dom element.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,binder,value'
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
              "value": "engine.binder.value"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "get value or innerHtml property value from a dom element."
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
        "2iyza140km2qoizm"
      ],
      "containers": {
        "2iyza140km2qoizm": {
          "id": "2iyza140km2qoizm",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst valueField = engine.make.input({\n  parent:pageId,  //change this to the id of parent dom element\n  type:'string',\n  placeholder:'give me a value'\n});\n\nlet inputValue = engine.binder.value(valueField);\n\nconsole.log(inputValue);"
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
