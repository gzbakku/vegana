(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-creator';
const pageName = 'docsPage';
const contName = 'creatorCont';

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
  require("./panels/drawPanel/panel");

  require("./panels/eventsPanel/panel");
  require("./panels/expirePanel/panel");

  require("./panels/functionPanel/panel");
  require("./panels/timerPanel/panel");

  require("./panels/touchPanel/panel");
  require("./panels/viewPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","creatorCont",data.panel);
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

},{"./panels/drawPanel/panel":2,"./panels/eventsPanel/panel":4,"./panels/expirePanel/panel":6,"./panels/functionPanel/panel":8,"./panels/introPanel/panel":10,"./panels/timerPanel/panel":12,"./panels/touchPanel/panel":14,"./panels/viewPanel/panel":16}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-draw';
const pageName = 'docsPage';
const contName = 'creatorCont';
const panelName = 'drawPanel';

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
  title:'Vegana Api : Engine Make Creator Draw',
  meta:[
    {
      name:'description',
      content:'vegana creator api to style a som element for any platforms from one input.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,creator,draw,all,style'
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
    "2iyza824km4hobib",
    "2iyza824km4hy5s9"
  ],
  "rows": {
    "2iyza824km4hobib": {
      "id": "2iyza824km4hobib",
      "template": [
        "2iyza824km4hocb7",
        "2iyza824km4hovur",
        "2iyza824km4hpncz"
      ],
      "containers": {
        "2iyza824km4hocb7": {
          "id": "2iyza824km4hocb7",
          "field": {
            "type": "heading",
            "data": {
              "value": "Vegana Creator Draw Api"
            }
          }
        },
        "2iyza824km4hovur": {
          "id": "2iyza824km4hovur",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "\nvegana creator draw api helps you to draw css for multiple platforms from a single object input, children platform properties overtake parent properties ie border property in all group will be replaced by border property in electron -> all group and then be replaced by border property of electron -> all -> linux group.\n"
            }
          }
        },
        "2iyza824km4hpncz": {
          "id": "2iyza824km4hpncz",
          "field": {
            "type": "code",
            "data": {
              "value": "\n\nengine.make.div({\n\tparent:pageId,\n    text:'see my borders',\n    draw:{\n    \tall:{\n        \t'border-radius':'10px',\n        \tpadding:'10px',\n        \tborder:\"5px solid red\"\n        },\n        browser:{\n        \tpc:{\n            \tborder:\"5px solid purple\"\n            \t//applied is user is on pc browser\n            },\n            mobile:{\n            \tborder:\"5px solid pink\"\n            \t//applied is user is on mobile browser\n            },\n        },\n        cordova:{\n        \tall:{\n            \t//applied is user is on cordova\n            },\n        \tios:{\n            \t//applied is user is on cordova ios\n            },\n            android:{\n            \t//applied is user is on cordova android\n            },\n        },\n        electron:{\n        \tall:{\n            \t//applied is user is on electron all\n                border:\"5px solid blue\"\n            },\n        \tmac:{\n            \t//applied is user is on electron mac\n            },\n            linux:{\n            \t//applied is user is on electron linux\n                border:\"5px solid yellow\"\n            },\n            windows:{\n            \t//applied is user is on electron windows\n            },\n        }\n    }\n});\n\n//--------------------------\n//output for each platform\n//--------------------------\n\n/*\n\tbrowser \t\t=> \"5px solid red\"\n    electron \t\t=> \"5px solid blue\"\n    electron-linux \t=> \"5px solid yellow\"\n*/\n\n//--------------------------\n//Platform Heirarchy\n//--------------------------\n/*\n\n\tall -> browser \t-> all -> pc \t/ mobile\n    all -> electron -> all -> linux / windows / mac\n    all -> cordova \t-> all -> ios \t/ android\n    \n    **all parent properties are replaced by children properties.\n\n*/\n\n\n"
            }
          }
        }
      }
    },
    "2iyza824km4hy5s9": {
      "id": "2iyza824km4hy5s9",
      "template": [],
      "containers": {}
    }
  }
}
},{}],4:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-events';
const pageName = 'docsPage';
const contName = 'creatorCont';
const panelName = 'eventsPanel';

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
  title:'Vegana Api : Engine Make Creator Events | Event Listener',
  meta:[
    {
      name:'description',
      content:'vegana creator api to add event listeneres to any dom element from one input.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,creator,events,event,add,eventListener'
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
    "2iyza824km4ibz4b",
    "2iyza824km4igb3w",
    "2iyza824km4igkh0"
  ],
  "rows": {
    "2iyza824km4ibz4b": {
      "id": "2iyza824km4ibz4b",
      "template": [
        "2iyza824km4ic17v",
        "2iyza824km4ic6ii"
      ],
      "containers": {
        "2iyza824km4ic17v": {
          "id": "2iyza824km4ic17v",
          "field": {
            "type": "heading",
            "data": {
              "value": "Vegana Creator Events Api"
            }
          }
        },
        "2iyza824km4ic6ii": {
          "id": "2iyza824km4ic6ii",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "\nthis api provides a simple fast way to attach events to a dom element either you can attach one or multiple events to any dom element when you are making it.\n"
            }
          }
        }
      }
    },
    "2iyza824km4igb3w": {
      "id": "2iyza824km4igb3w",
      "template": [
        "2iyza824km4igcdg",
        "2iyza824km4ige9o"
      ],
      "containers": {
        "2iyza824km4igcdg": {
          "id": "2iyza824km4igcdg",
          "field": {
            "type": "heading",
            "data": {
              "value": "Add Single Event"
            }
          }
        },
        "2iyza824km4ige9o": {
          "id": "2iyza824km4ige9o",
          "field": {
            "type": "code",
            "data": {
              "value": "\nengine.make.div({\n\tparent:pageId,\n    text:\"hover over me\",\n    event:{\n    \ttype:\"pointerenter\",\n        function:()=>{\n        \tconsole.log(\"you are on me\");\n        }\n    }\n});\n"
            }
          }
        }
      }
    },
    "2iyza824km4igkh0": {
      "id": "2iyza824km4igkh0",
      "template": [
        "2iyza824km4igmrf",
        "2iyza824km4igsxg"
      ],
      "containers": {
        "2iyza824km4igmrf": {
          "id": "2iyza824km4igmrf",
          "field": {
            "type": "heading",
            "data": {
              "value": "Add Multiple Events"
            }
          }
        },
        "2iyza824km4igsxg": {
          "id": "2iyza824km4igsxg",
          "field": {
            "type": "code",
            "data": {
              "value": "\n\nengine.make.div({\n\tparent:pageId,\n    text:\"check context\",\n    events:[\n    \t{event:\"pointerenter\",function:()=>{\n        \tconsole.log(\"i am in context\");\n        }},\n        {event:\"pointerleave\",function:()=>{\n        \tconsole.log(\"i am out of context\");\n        }}\n    ]\n});\n"
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
const panelRef = '-panel-expire';
const pageName = 'docsPage';
const contName = 'creatorCont';
const panelName = 'expirePanel';

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
  title:'Vegana Api : Engine Make Creator Expire',
  meta:[
    {
      name:'description',
      content:'vegana creator api to remove a dom element after a given time.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,creator,expire'
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
    "2iyza824km4ibz4b"
  ],
  "rows": {
    "2iyza824km4ibz4b": {
      "id": "2iyza824km4ibz4b",
      "template": [
        "2iyza824km4ic17v",
        "2iyza824km4ic6ii",
        "2iyza824km4ic8pv"
      ],
      "containers": {
        "2iyza824km4ic17v": {
          "id": "2iyza824km4ic17v",
          "field": {
            "type": "heading",
            "data": {
              "value": "Vegana Creator Expire Api"
            }
          }
        },
        "2iyza824km4ic6ii": {
          "id": "2iyza824km4ic6ii",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api simply removes a dom element after given time in milliseconds"
            }
          }
        },
        "2iyza824km4ic8pv": {
          "id": "2iyza824km4ic8pv",
          "field": {
            "type": "code",
            "data": {
              "value": "\nengine.make.div({\n\tparent:pageId,\n    text:\"i will disappear in 5 seconds\",\n    expire:5000\n});\n"
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
const panelRef = '-panel-function';
const pageName = 'docsPage';
const contName = 'creatorCont';
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

const trackers = {
  title:'Vegana Api : Engine Make Creator Function',
  meta:[
    {
      name:'description',
      content:'vegana creator api to trigger a function on relevant event.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,creator,function'
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
    "2iyza824km4ibz4b"
  ],
  "rows": {
    "2iyza824km4ibz4b": {
      "id": "2iyza824km4ibz4b",
      "template": [
        "2iyza824km4ic17v",
        "2iyza824km4ic6ii",
        "2iyza824km4ic8pv"
      ],
      "containers": {
        "2iyza824km4ic17v": {
          "id": "2iyza824km4ic17v",
          "field": {
            "type": "heading",
            "data": {
              "value": "Vegana Creator Function Api"
            }
          }
        },
        "2iyza824km4ic6ii": {
          "id": "2iyza824km4ic6ii",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api attaches function which is triggered by context like a div will have a function that will trigger on click and string input will trigger on key input.\nyou can pass functionData property this will be passed as a argument to the trigger function so you can use it later.\nthe dom elements which can return a value will give a value argument after the id element."
            }
          }
        },
        "2iyza824km4ic8pv": {
          "id": "2iyza824km4ic8pv",
          "field": {
            "type": "code",
            "data": {
              "value": "\n/*==============================\n\tnon value trigger\n==============================*/\n/*\n\t\n    triggerFunction(id,functionData,event);\n\t\n*/\n    \n/*==============================\n\tvalue trigger\n==============================*/    \n/*\n\t\n    triggerFunction(id,value,functionData,event);\n\t\n*/\n    \n/*==============================\n\tfunction data\n==============================*/       \n\nengine.make.div({\n\tparent:pageId,\n    text:\"function data example\",\n    \n    //--------------------------\n    //this data is passed to the trigger function on event.\n    //this field is not required\n    \n    functionData:{some:true},\n    \n    //--------------------------\n\n    function:(id,functionData,event)=>{/*do something*/}\n});\n\n/*==============================\n\tdiv function\n==============================*/\n\nengine.make.div({\n\tparent:pageId,\n    text:\"click me\",\n    functionData:{\n    \tsome:true\n    },\n    function:(id,functionData,event)=>{\n    \n    \t//id is the elemt id\n        //functionData is the data passed above\n        //event is a defualt dom event\n        \n        console.log(\"i was clicked\");\n        \n    }\n});\n\n/*==============================\n\tstring input function\n==============================*/\n\nengine.make.input({\n\tparent:pageId,\n    type:'string',\n    placeholder:\"text goes here\",\n    functionData:{\n    \tsome:true\n    },\n    function:(id,value,functionData,event)=>{\n    \n    \t//id is the elemt id\n        //value is a string\n        //functionData is the data passed above\n        //event is a defualt dom event\n        \n        console.log(`some string : ${value}`);\n        \n    }\n});\n\n/*==============================\n\tnumber input function\n==============================*/\n\nengine.make.input({\n\tparent:pageId,\n    type:'number',\n    placeholder:\"number goes here\",\n    functionData:{\n    \tsome:true\n    },\n    function:(id,value,functionData,event)=>{\n    \n    \t//id is the elemt id\n        //value is a number\n        //functionData is the data passed above\n        //event is a defualt dom event\n        \n        console.log(`some number : ${value}`);\n        \n    }\n});\n"
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
const panelRef = '-panel-intro';
const pageName = 'docsPage';
const contName = 'creatorCont';
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
  title:'Vegana Api : Engine Make Creator',
  meta:[
    {
      name:'description',
      content:'vegana creator api'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,creator'
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
    "2iyza170km4edcfg",
    "2iyza170km4elssx",
    "2iyza170km4eivqq",
    "2iyza170km4ftasq"
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
              "value": "engine.make.creator"
            }
          }
        },
        "2iyza9rkkm1pgwzx": {
          "id": "2iyza9rkkm1pgwzx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api makes html dom elements with integrated functions that can make development a lot faster and reduce code base size and makes execution as fast as native html. \nprimary motive for this api is to reduce code size so you can pass any key needed by the dom element and that will be passed to the element, execpt a few reserved keywords."
            }
          },
          "style": {}
        }
      }
    },
    "2iyza170km4edcfg": {
      "id": "2iyza170km4edcfg",
      "template": [
        "2iyza170km4eddsr"
      ],
      "containers": {
        "2iyza170km4eddsr": {
          "id": "2iyza170km4eddsr",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//how to make a div in vegana js\n\n/*==============================\n\nengine.make.creator(tag,properties);\n\tdom element type^^^\t^^^ object\n\n==============================*/\n\nlet parentElement = engine.make.div({\n\tid:'any-id',\n\tparent:pageId,\n});\n\nlet makeElement = engine.make.creator(\"div\",{\n\tparent:parentElement,\n    class:'some-class',\n    text:\"i am a div\"\n});\n"
            }
          }
        }
      }
    },
    "2iyza170km4eivqq": {
      "id": "2iyza170km4eivqq",
      "template": [
        "2iyza170km4eixh6",
        "2iyza170km4ej3uy",
        "2iyza170km4f08cj"
      ],
      "containers": {
        "2iyza170km4eixh6": {
          "id": "2iyza170km4eixh6",
          "field": {
            "type": "heading",
            "data": {
              "value": "Element Parent Property"
            }
          }
        },
        "2iyza170km4ej3uy": {
          "id": "2iyza170km4ej3uy",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "first element of a module can use id from any vegana module ie pageId,contId,panelId or compId.\nparent is a string id of the parent dom element."
            }
          }
        },
        "2iyza170km4f08cj": {
          "id": "2iyza170km4f08cj",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst first_comp_element = engine.make.creator(\"div\",{\n\tparent:compId,\n    text:\"i am first element of comp module\"\n});\n\nconst first_page_element = engine.make.creator(\"div\",{\n\tparent:pageId,\n    text:\"i am first element of page module\"\n});\n\nconst first_cont_element = engine.make.creator(\"div\",{\n\tparent:contId,\n    text:\"i am first element of cont module\"\n});\n\nconst first_panel_element = engine.make.creator(\"div\",{\n\tparent:panelId,\n    text:\"i am first element of panel module\"\n});\n"
            }
          }
        }
      }
    },
    "2iyza170km4elssx": {
      "id": "2iyza170km4elssx",
      "template": [
        "2iyza170km4elwcx",
        "2iyza170km4em4yp",
        "2iyza170km4epv6f"
      ],
      "containers": {
        "2iyza170km4elwcx": {
          "id": "2iyza170km4elwcx",
          "field": {
            "type": "heading",
            "data": {
              "value": "Element Id Property"
            }
          }
        },
        "2iyza170km4em4yp": {
          "id": "2iyza170km4em4yp",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "id is an identifying tag used to select dom element from html document it can be provided by id key in object property if no id is provided a random id is assigned with concatenation.\n\nid can be provided as is and to remove clashes with other ids the id will be concantinated with id of its parent element ie if the ID of parent element is \"one\" the id of its child element will be \"one-child\".\n\nconstant id without any concantination be provided if only_id property is provided as true boolean with the object properties."
            }
          }
        },
        "2iyza170km4epv6f": {
          "id": "2iyza170km4epv6f",
          "field": {
            "type": "code",
            "data": {
              "value": "\nfunction show_my_id(id){\n\tengine.set.div.text(id,`my id : ${id}`);\n}\n\nconst parentElement = engine.make.div({\n\tid:\"id_test_property\",\n    only_id:true,\n\tparent:pageId\n});\n\nlet draw = {\n\tall:{\n    \tmargin:'10px',\n        border:\"5px solid purple\",\n        \"border-radius\":\"10px\",\n        padding:'10px'\n    }\n};\n\n//============================\n// user defined id\n//============================\nconst concantinated_id = engine.make.creator(\"div\",{\n\tid:\"one\",\n    parent:parentElement,\n    text:\"click to see my id : concantinated_id\",\n    function:show_my_id,\n    draw:draw\n});\n//output = \"base-one\" id will be concantenated with parent id\n\n//============================\n// no id provided\n//============================\nconst no_id = engine.make.creator(\"div\",{\n    parent:parentElement,\n    text:\"click to see my id : no_id\",\n    function:show_my_id,\n    draw:draw\n});\n//output = \"base-sdsd98\" random id will be assigned with concantation\n\n//============================\n// constant id\n//============================\nconst constant_id = engine.make.creator(\"div\",{\n\tid:\"constant\",\n    //---------------\n    only_id:true,//this property assigns constant id\n    //---------------\n    parent:parentElement,\n    text:\"click to see my id : constant_id\",\n    function:show_my_id,\n    draw:draw\n});\n//output = \"constant\" provided is will be assigned\n\n"
            }
          }
        }
      }
    },
    "2iyza170km4ftasq": {
      "id": "2iyza170km4ftasq",
      "template": [
        "2iyza824km4g6lh3",
        "2iyza824km4g6un1",
        "2iyza824km4gf1bu"
      ],
      "containers": {
        "2iyza824km4g6lh3": {
          "id": "2iyza824km4g6lh3",
          "field": {
            "type": "heading",
            "data": {
              "value": "Element Class Property"
            }
          }
        },
        "2iyza824km4g6un1": {
          "id": "2iyza824km4g6un1",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "class should be provided without \".\" at the begnning."
            }
          }
        },
        "2iyza824km4gf1bu": {
          "id": "2iyza824km4gf1bu",
          "field": {
            "type": "code",
            "data": {
              "value": "\nengine.make.div({\n\n\tparent:pageId,\n    \n    //=================================\n    class:\"page-main-div-main\",\n    //=================================\n    \n    text:\"i am a div\"\n    \n})\n"
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
const panelRef = '-panel-timer';
const pageName = 'docsPage';
const contName = 'creatorCont';
const panelName = 'timerPanel';

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
  title:'Vegana Api : Engine Make Creator Timer',
  meta:[
    {
      name:'description',
      content:'vegana creator api to trigger fuction on long press or time given.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,creator,timer'
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
    "2iyza824km4ibz4b"
  ],
  "rows": {
    "2iyza824km4ibz4b": {
      "id": "2iyza824km4ibz4b",
      "template": [
        "2iyza824km4ic17v",
        "2iyza824km4ic6ii",
        "2iyza824km4ic8pv"
      ],
      "containers": {
        "2iyza824km4ic17v": {
          "id": "2iyza824km4ic17v",
          "field": {
            "type": "heading",
            "data": {
              "value": "Vegana Creator Timer Api"
            }
          }
        },
        "2iyza824km4ic6ii": {
          "id": "2iyza824km4ic6ii",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api triggers a function after given time after pointer down event or in simple words on long press."
            }
          }
        },
        "2iyza824km4ic8pv": {
          "id": "2iyza824km4ic8pv",
          "field": {
            "type": "code",
            "data": {
              "value": "\nengine.make.div({\n\tparent:pageId,\n    text:\"long press me\",\n    timer:{\n    \tfunctionData:{\n        \tsome:true\n        },\n    \ttime:1000,//time in miliseconds\n        function:(id,functionData)=>{\n        \tconsole.log(\"its been 1 second.\");\n        }\n    }\n});\n"
            }
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
const panelRef = '-panel-touch';
const pageName = 'docsPage';
const contName = 'creatorCont';
const panelName = 'touchPanel';

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
  title:'Vegana Api : Engine Make Creator Touch',
  meta:[
    {
      name:'description',
      content:'vegana creator api to trigger event on pointer movements'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,creator,touch'
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
    "2iyza824km4ibz4b"
  ],
  "rows": {
    "2iyza824km4ibz4b": {
      "id": "2iyza824km4ibz4b",
      "template": [
        "2iyza824km4ic17v",
        "2iyza824km4ic6ii",
        "2iyza824km4ic8pv"
      ],
      "containers": {
        "2iyza824km4ic17v": {
          "id": "2iyza824km4ic17v",
          "field": {
            "type": "heading",
            "data": {
              "value": "Vegana Creator Touch Api"
            }
          }
        },
        "2iyza824km4ic6ii": {
          "id": "2iyza824km4ic6ii",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api provides stream of position data to a tigger function starting from pointer down on given dom element continuing with pointer move and ends with pointer up. "
            }
          }
        },
        "2iyza824km4ic8pv": {
          "id": "2iyza824km4ic8pv",
          "field": {
            "type": "code",
            "data": {
              "value": "\nengine.make.div({\n\tparent:pageId,\n    text:\"track me\",\n    functionData:{some:true},\n    touch:(id,move,functionData,event)=>{\n    \t//id = this element id\n        //move is a custom move object\n        //functionData = you can provide it in element properties\n        //event defualt dom event\n        \n        console.log(move);\n        \n    }\n});\n\n/*===========================\n\n\t//------------------------------\n    \tmove object\n    //------------------------------\n    \n    {\n    \n      type:start/continue/end,\n\n      dirX:left/right,\n      dirY:top/bottom,\n\n      moveX:Diff_Number_PX,\n      moveY:Diff_Number_PX,\n\n      posX:Number_PX,\n      posY:Number_PX,\n\n      basePosX:Number_PX,\n      basePosY:Number_PX,\n\n      percX:Number_Perc,\n      percY:Number_Perc,\n\n      time:MilliSeconds\n    \n  }\n\n===========================*/\n"
            }
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
const panelRef = '-panel-view';
const pageName = 'docsPage';
const contName = 'creatorCont';
const panelName = 'viewPanel';

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
  title:'Vegana Api : Engine Make Creator Enter | Exit',
  meta:[
    {
      name:'description',
      content:'vegana creator api to trigger events when a dom element comes in or goes out of user view.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,creator,enter,exit'
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
    "2iyza824km4ibz4b"
  ],
  "rows": {
    "2iyza824km4ibz4b": {
      "id": "2iyza824km4ibz4b",
      "template": [
        "2iyza824km4ic17v",
        "2iyza824km4ic6ii",
        "2iyza824km4ic8pv"
      ],
      "containers": {
        "2iyza824km4ic17v": {
          "id": "2iyza824km4ic17v",
          "field": {
            "type": "heading",
            "data": {
              "value": "Vegana Creator Context Apis"
            }
          }
        },
        "2iyza824km4ic6ii": {
          "id": "2iyza824km4ic6ii",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "these apis can trigger when a dom element comes in or goes out of view."
            }
          }
        },
        "2iyza824km4ic8pv": {
          "id": "2iyza824km4ic8pv",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//.................................\n//padding\nengine.make.div({\n\tparent:pageId,\n    draw:{\n    \tall:{\n        \theight:'100vh'\n        }\n    }\n});\n//.................................\n\n\n//============================================\n\nengine.make.div({\n\tparent:pageId,\n    text:\"follow me\",\n    enter:(id)=>{\n    \tconsole.log(\"i entered the view\");\n    },\n    exit:(id)=>{\n    \tconsole.log(\"i exited the view\");\n    }\n});\n\n//============================================\n\n//.................................\n//padding\nengine.make.div({\n\tparent:pageId,\n    draw:{\n    \tall:{\n        \theight:'100vh'\n        }\n    }\n});\n//.................................\n"
            }
          }
        }
      }
    }
  }
}
},{}]},{},[1]);
