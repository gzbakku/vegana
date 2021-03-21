(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-make';
const pageName = 'docsPage';
const contName = 'makeCont';

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
  if(!data.panel){data.panel = 'divPanel';}

  require("./panels/aPanel/panel");

  require("./panels/divPanel/panel");
  require("./panels/textPanel/panel");
  require("./panels/spanPanel/panel");
  require("./panels/pPanel/panel");
  require("./panels/headingPanel/panel");
  require("./panels/imagePanel/panel");
  require("./panels/addClassPanel/panel");
  require("./panels/removeClassPanel/panel");
  require("./panels/stylePanel/panel");

  require("./panels/selectPanel/panel");
  require("./panels/inputPanel/panel");
  require("./panels/textareaPanel/panel");
  require("./panels/buttonPanel/panel");

  require("./panels/listPanel/panel");

  require("./panels/elementPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","makeCont",data.panel);
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

},{"./panels/aPanel/panel":2,"./panels/addClassPanel/panel":4,"./panels/buttonPanel/panel":6,"./panels/divPanel/panel":8,"./panels/elementPanel/panel":10,"./panels/headingPanel/panel":12,"./panels/imagePanel/panel":14,"./panels/inputPanel/panel":16,"./panels/listPanel/panel":18,"./panels/pPanel/panel":20,"./panels/removeClassPanel/panel":22,"./panels/selectPanel/panel":24,"./panels/spanPanel/panel":26,"./panels/stylePanel/panel":28,"./panels/textPanel/panel":30,"./panels/textareaPanel/panel":32}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-a';
const pageName = 'docsPage';
const contName = 'makeCont';
const panelName = 'aPanel';

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
  title:'Vegana Api : Engine Make A',
  meta:[
    {
      name:'description',
      content:'vegana make api to make a href dom element.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,a'
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
    "2iyza5mwkm50399y"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.a"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api makes a \"A href\" dom element for native vegana app.vegana native href supports to form links with native router platform ie you can give it page,cont,panel and params for building internal links but you can also provide external urls.this api provides baseFunction which are triggered anytime the link is clicked then the default link behavior is triggered or superFunction which is triggered on click but does not follow with default link click behavior."
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\n\nlet draw = {\n    \tall:{\n        \tdisplay:'block',\n        \tpadding:'10px'\n        }\n    };\n\n//this will log the given and go to the link afterwards\n//if the location is available in app it will try to route through the internal router or else it will route to a link.\nlet link_follow = engine.make.a({\n\tparent:pageId,\n\ttype:\"local\",\n    text:\"to docsPage->addCont->objectPanel\",\n    page:\"docsPage\",\n    cont:\"addCont\",\n    panel:\"objectPanel\",\n    baseFunction:()=>{\n    \tconsole.log(\"to docsPage->addCont->objectPanel\");\n    },\n    draw:draw\n});\n\n//this will log the given and end the function.\nlet link_no_follow = engine.make.a({\n\tparent:pageId,\n\ttype:\"local\",\n    text:\"to docsPage->addCont->functionPanel\",\n    page:\"docsPage\",\n    cont:\"addCont\",\n    panel:\"functionPanel\",\n    superFunction:()=>{\n    \tconsole.log(\"to docsPage->addCont->functionPanel\");\n    },\n    draw:draw\n});\n\n//external link\nlet external_link = engine.make.a({\n\tparent:pageId,\n\ttype:\"url\",\n    href:\"https://some.com/some_link\",\n    text:\"to some.com\",\n    draw:draw\n});\n\n"
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
const panelRef = '-panel-addClass';
const pageName = 'docsPage';
const contName = 'makeCont';
const panelName = 'addClassPanel';

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
  title:'Vegana Api : Engine Make AddClass',
  meta:[
    {
      name:'description',
      content:'how to add a class to a dom element in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,addClass'
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
    "2iyza5mwkm50399y"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.addClass"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api adds a class property to any dom element."
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\nlet class_added = false;\n\nlet parent_div = engine.make.div({\n\tparent:pageId,\n    text:'click me',\n    class:\"page-docs-cont-make-panel-addClass-test_div\",\n    function:(id)=>{\n    \n    \tif(class_added){\n        \treturn true;\n        }\n    \t\n        //------------------------------------\n        //api is here\n        \n        /*\n        \n        \tengine.make.addClass({id,class})\n        \n        */\n        \n        engine.make.addClass({\n        \tid:id,\n            class:\"page-docs-cont-make-panel-addClass-class_to_add\"\n        });\n        \n        //------------------------------------\n        \n    }\n});\n"
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
const panelRef = '-panel-button';
const pageName = 'docsPage';
const contName = 'makeCont';
const panelName = 'buttonPanel';

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
  title:'Vegana Api : Engine Make Button',
  meta:[
    {
      name:'description',
      content:'how to make a button input in vegana js'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,button'
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
    "2iyza5mwkm50399y"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.button"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api makes a dom button type input element."
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\"\n        }\n    }\n});\n\n    const value_div = engine.make.div({\n        parent:parent_div,\n        text:'number of button clicks will be displayed here.',\n        draw:{\n            all:{\n                border:\"5px solid pink\",\n                padding:\"10px\"\n            }\n        }\n    });\n    \n    let count = 0;\n\n\tengine.make.button({\n    \tparent:parent_div,\n        value:'click me',\n        draw:{\n            all:{\n                border:\"5px solid pink\",\n                'border-radius':'10px',\n                padding:\"10px\",\n                margin:\"10px\"\n            }\n        },\n        function:(id,value)=>{\n        \tcount += 1;\n        \tengine.set.div.text(value_div,`click count : ${count}`);\n        }\n    });\n\n"
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
const panelRef = '-panel-div';
const pageName = 'docsPage';
const contName = 'makeCont';
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
  title:'Vegana Api : Engine Make Div',
  meta:[
    {
      name:'description',
      content:'how to make a div in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,div'
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
    "2iyza5mwkm50399y"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.div"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "\nthis api makes a div please check creator api to know how it works this is just a wrapper for creator api.\n\nfunction trigger is click for divs.\n"
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\"\n        }\n    }\n});\n\nlet clicks_count = 0;\n\nconst make_div = engine.make.div({\n\tparent:parent_div,\n    text:\"i am a child div\",//this is not required,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid pink\",\n            padding:\"10px\",\n            cursor:'pointer',\n            'user-select':'none'\n        }\n    },\n    function:(id)=>{\n    \tclicks_count += 1;\n        engine.set.div.text(id,`you click me ${clicks_count} times.`);\n    }\n});\n\n"
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
const panelRef = '-panel-element';
const pageName = 'docsPage';
const contName = 'makeCont';
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
  title:'Vegana Api : Engine Make Element',
  meta:[
    {
      name:'description',
      content:'how to make a dom element in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,element'
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
    "2iyza5mwkm50399y"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.element"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this is just a wrapper of creator api for os native wrappers, you dont have to use it but you can if you want to."
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\nengine.make.element({\n\tparent:pageId,\n    tag:'div',\n    text:\"i am a div.\"\n});\n"
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
const panelRef = '-panel-heading';
const pageName = 'docsPage';
const contName = 'makeCont';
const panelName = 'headingPanel';

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
  title:'Vegana Api : Engine Make Heading',
  meta:[
    {
      name:'description',
      content:'how to make a heading element in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,heading'
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
    "2iyza5mwkm50399y"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.heading"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api makes a heading dom element."
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\"\n        }\n    }\n});\n\n//engine.make.heading({\"all creator params\",level});\n\n//level is to be provided for this specific vegana creator api.\n\nengine.make.heading({\n\tparent:parent_div,\n    level:1,\n    text:\"heading 1\"\n});\n\nengine.make.heading({\n\tparent:parent_div,\n    level:2,\n    text:\"heading 2\"\n});\n\nengine.make.heading({\n\tparent:parent_div,\n    level:3,\n    text:\"heading 3\"\n});\n\nengine.make.heading({\n\tparent:parent_div,\n    level:4,\n    text:\"heading 4\"\n});\n"
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
const panelRef = '-panel-image';
const pageName = 'docsPage';
const contName = 'makeCont';
const panelName = 'imagePanel';

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
  title:'Vegana Api : Engine Make Image',
  meta:[
    {
      name:'description',
      content:'how to make a image element in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,image'
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
    "2iyza5mwkm50399y"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.image"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api amkes dom image element but since vegana does have dynamic routing to support multiple platforms local images can be loded by the routing system ie local image present in assets directory can be loaded by just proviing a relative path to the assets directory."
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\",\n            \"grid-template-columns\":\"50% 50%\",\n            display:\"grid\"\n        }\n    }\n});\n\n//local image\n\nconst local_image_div = engine.make.div({\n\tparent:parent_div,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid pink\",\n            padding:\"10px\",\n        }\n    }\n});\n\n  engine.make.image({\n      parent:local_image_div,\n      type:\"local\",\n      location:\"assets/images/logo-mix.png\",\n      draw:{\n          all:{\n              height:\"100px\",\n              width:\"200px\"\n          }\n      }\n  });\n\n//from a link\n\nconst url_image_div = engine.make.div({\n\tparent:parent_div,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid blue\",\n            padding:\"10px\",\n        }\n    }\n});\n\n  const href = engine.make.a({\n      parent:url_image_div,\n      type:'url',\n      href:'https://www.mozilla.org',\n\t  text:'visit mozzila org and show your support.',\n      target:'_blank'\n  });\n\n    engine.make.image({\n        parent:href,\n        type:\"url\",\n        location:\"https://www.mozilla.org/media/protocol/img/logos/firefox/logo-lg-high-res.7ba3ce88e665.png\",\n        draw:{\n          all:{\n              height:\"100px\",\n              width:\"100px\"\n          }\n        }\n    });\n"
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
const panelRef = '-panel-input';
const pageName = 'docsPage';
const contName = 'makeCont';
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
  title:'Vegana Api : Engine Make Input',
  meta:[
    {
      name:'description',
      content:'how to make a input element in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,input,string,number,files,checkbox'
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
    "2iyza5mwkm50399y"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.input"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api makes a dom input element it takes a type value to provide the specific input functions as per user need."
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\"\n        }\n    }\n});\n\n    const value_div = engine.make.div({\n        parent:parent_div,\n        text:'selected value will be displayed here.',\n        draw:{\n            all:{\n                border:\"5px solid pink\",\n                padding:\"10px\"\n            }\n        }\n    });\n    \n    let input_draw = {\n    \tall:{\n        \tdisplay:'block',\n            border:\"5px solid pink\",\n            width:'100%',\n            padding:\"10px\",\n            'outline':'none'\n        }\n    };\n        \n     let input_function =  (id,value)=>{\n     \tif(typeof(value) !== \"string\"){\n        \tvalue = String(value);\n        }\n     \tengine.set.div.text(value_div,`selected value : ${value}`);\n     }  \n\n\tengine.make.input({\n    \tparent:parent_div,\n        type:\"string\",\n        placeholder:'string input',\n        draw:input_draw,\n        function:input_function\n    });\n    \n    engine.make.input({\n    \tparent:parent_div,\n        type:\"number\",\n        placeholder:'number input',\n        draw:input_draw,\n        function:input_function\n    });\n    \n    engine.make.input({\n    \tparent:parent_div,\n        type:\"email\",\n        placeholder:'email input',\n        draw:input_draw,\n        function:input_function\n    });\n    \n    engine.make.input({\n    \tparent:parent_div,\n        type:\"file\",\n        draw:input_draw,\n        function:(id,files)=>{\n            engine.set.div.text(value_div,`selected file : ${files[0].name}`);\n        }\n    });\n    \n    engine.make.input({\n    \tparent:parent_div,\n        type:\"checkbox\",\n        draw:{\n        \tall:{\n            \tmargin:\"10px\"\n            }\n        },\n        function:(id,checked)=>{\n            engine.set.div.text(value_div,`selected value : checked => ${checked}`);\n        }\n    });\n\n"
            }
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
const panelRef = '-panel-list';
const pageName = 'docsPage';
const contName = 'makeCont';
const panelName = 'listPanel';

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
  title:'Vegana Api : Engine Make List',
  meta:[
    {
      name:'description',
      content:'how to make a list element in vegana js. how to make a ul list in vegana js.how to make a ol list in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,list,ol,li,ul'
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
    "2iyza5mwkm50399y",
    "2iyza6wwkm5wnswy"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.list"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "\nthis api makes a list dom element\n\nlist api works on the concept of inheritance ie all creator apis like function event and events will be applied to list items not to list itself so you can control each list item with single function input, but sometimes you may need to apply unique functions to list items for this purpose you can pass creator apis directly to the list items.\n\n**draw sub-api from creator api is not inherited by list items they break the inheritane pattern used by native wrappers. \n\n**only event, events, class and function creator apis are inherited.\n"
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\"\n        }\n    }\n});\n\nengine.make.list({\n\tparent:parent_div,\n    \n    //this is class applied to the list element itself\n    class:\"page-docs-cont-make-panel-list-list\",\n    \n    //this can be ol and ul default is ol if not provided\n    type:'ol',\n    \n    //item class will be applied to all list items\n    itemClass:'page-docs-cont-make-panel-list-list-item',\t\n    \n    //creator function api will be applied to list item\n    function:()=>{console.log(\"item is clicked\");},\t\t\n    \n    //creator events api will be applied to list item\n    //events will be overtaken if provided by any list item object\n    //events:[..{creator_event_object}]\t\n    //event:{creator_event_object}\n    \n    //click items and see item one function overtakes the global function.\n    data:[\n    \t{\n        \ttext:\"item one\",\n            //overtakes global item function if defined\n            function:()=>{console.log(\"item one is clicked\");},\n            //overtakes itemClass if defined\n            class:'page-docs-cont-make-panel-list-list-item_one'\t\t\t\t\t\t\t\n        },\n        {text:\"item two\"},\n        {text:\"item three\"},\n        {text:\"item four\"},\n    ]\n});\n\n"
            }
          }
        }
      }
    },
    "2iyza6wwkm5wnswy": {
      "id": "2iyza6wwkm5wnswy",
      "template": [
        "2iyza6wwkm5wnttm",
        "2iyza6wwkm5wnu9u",
        "2iyza6wwkm5wnuo9"
      ],
      "containers": {
        "2iyza6wwkm5wnttm": {
          "id": "2iyza6wwkm5wnttm",
          "field": {
            "type": "heading",
            "data": {
              "value": "add new items to list"
            }
          }
        },
        "2iyza6wwkm5wnu9u": {
          "id": "2iyza6wwkm5wnu9u",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "sometimes you may need to add items to the list this is assumed since vegana is a active framework."
            }
          }
        },
        "2iyza6wwkm5wnuo9": {
          "id": "2iyza6wwkm5wnuo9",
          "field": {
            "type": "code",
            "data": {
              "value": "\n\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\"\n        }\n    }\n});\n\nconst list = engine.make.list({\n\n\tparent:parent_div,\n    class:\"page-docs-cont-make-panel-list-list\",\n    type:'ol',\n    itemClass:'page-docs-cont-make-panel-list-list-item',\t\n    \n    data:[\n    \t{text:\"item one\"},\n        {text:\"item two\"},\n        {text:\"item three\"},\n        {text:\"item four\"},\n    ]\n});\n\n//=========================\n//add singel item\n//all list properties can be provided in base object\n//no orignal global list creator apis will be applied to this new item\n\nengine.make.listItem({\n\tlist_id:list,\n    itemClass:'page-docs-cont-make-panel-list-list-item',\n    text:\"item five\"\n});\n\n//=========================\n//add multiple items\n//all list properties can be provided in base object or the item object\n//no orignal global list creator apis will be applied to this new item\n\nengine.make.listItems({\n\tlist_id:list,\n    itemClass:'page-docs-cont-make-panel-list-list-item',\n    data:[\n    \t{text:\"item six\"},\n        {text:\"item seven\",class:\"page-docs-cont-make-panel-list-list-item_one\"},\n    ]\n});\n"
            }
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
const panelRef = '-panel-p';
const pageName = 'docsPage';
const contName = 'makeCont';
const panelName = 'pPanel';

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
  title:'Vegana Api : Engine Make Paragraph | <p>',
  meta:[
    {
      name:'description',
      content:'how to make a paragraph or a p element in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,p,paragraph'
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
    "2iyza5mwkm50399y"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.p"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "\nthis api makes a paragraph dom element.\n"
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\"\n        }\n    }\n});\n\nengine.make.p({\n\tparent:parent_div,\n    text:\"i am a paragraph element made in vegana js.\"\n});\n"
            }
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
const panelRef = '-panel-removeClass';
const pageName = 'docsPage';
const contName = 'makeCont';
const panelName = 'removeClassPanel';

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
  title:'Vegana Api : Engine Make RemoveClass',
  meta:[
    {
      name:'description',
      content:'how to remove a class from a fom element in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,class,remove,removeClass'
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
    "2iyza5mwkm50399y"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.removeClass"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api removes a class property to any dom element."
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\nlet class_added = false;\n\nlet parent_div = engine.make.div({\n\tparent:pageId,\n    text:'click me',\n    class:\"page-docs-cont-make-panel-addClass-test_div page-docs-cont-make-panel-addClass-class_to_add\",\n    function:(id)=>{\n    \n    \tif(class_added){\n        \treturn true;\n        }\n    \t\n        //------------------------------------\n        //api is here\n        \n        /*\n        \n        \tengine.make.removeClass({id,class})\n        \n        */\n        \n        engine.make.removeClass({\n        \tid:id,\n            class:\"page-docs-cont-make-panel-addClass-class_to_add\"\n        });\n        \n        //------------------------------------\n        \n    }\n});\n"
            }
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
const panelRef = '-panel-select';
const pageName = 'docsPage';
const contName = 'makeCont';
const panelName = 'selectPanel';

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
  title:'Vegana Api : Engine Make Select',
  meta:[
    {
      name:'description',
      content:'how to make a select input element in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,select'
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
    "2iyza5mwkm50399y"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.select"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api makes a dom select element."
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\"\n        }\n    }\n});\n\n    const value_div = engine.make.div({\n        parent:parent_div,\n        text:'selected value will be displayed here.',\n        draw:{\n            all:{\n                border:\"5px solid pink\",\n                padding:\"10px\"\n            }\n        }\n    });\n\n\tengine.make.select({\n    \tparent:parent_div,\n        options:[\n        \t{\n            \ttext:\"one\",\n                value:\"one_value\",\n                class:\"page-docs-cont-make-panel-select-option_class\"\n            },\n            {\n            \ttext:\"two\",\n                value:\"two_value\",\n                disabled:true\n            },\n            {text:'three',value:\"three_value\"},\n            {text:'four',value:\"four_value\"},\n            {text:'five',value:\"five_value\"},\n        ],\n        draw:{\n            all:{\n            \tdisplay:'block',\n                border:\"5px solid pink\",\n                width:'100%',\n                padding:\"10px\"\n            }\n        },\n        function:(id,value)=>{\n        \tengine.set.div.text(value_div,`selected value : ${value}`);\n        }\n    });\n\n"
            }
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
const panelRef = '-panel-span';
const pageName = 'docsPage';
const contName = 'makeCont';
const panelName = 'spanPanel';

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
  title:'Vegana Api : Engine Make Span',
  meta:[
    {
      name:'description',
      content:'how to make a span element in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,span'
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
    "2iyza5mwkm50399y"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.span"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api makes a span dom element."
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst span = engine.make.span({\n\tparent:pageId,\n    text:\"i am a span\"\n});\n"
            }
          }
        }
      }
    }
  }
}
},{}],28:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-style';
const pageName = 'docsPage';
const contName = 'makeCont';
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
  title:'Vegana Api : Engine Make Style',
  meta:[
    {
      name:'description',
      content:'how to edit or add style of a dom element in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,style,add,edit,update'
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

},{"./vDoc.json":29}],29:[function(require,module,exports){
module.exports={
  "template": [
    "2iyza5mwkm50399y"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.style"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api adds or replaces style property of a dom element."
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\n\n\nengine.make.div({\n\tparent:pageId,\n    text:'click me',\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\",\n            \"border-radius\":\"10px\"\n        }\n    },\n    function:(id)=>{\n    \t\n        //------------------------------------\n        //api is here\n        \n        //style is a object and it overtakes any style of parent element.\n        \n        engine.make.style({\n        \tid:id,\n            style:{\n            \tborder:\"5px solid pink\",\n                padding:\"20px\",\n                color:\"pink\"\n            }\n        });\n        \n        //------------------------------------\n        \n    }\n});\n\n"
            }
          }
        }
      }
    }
  }
}
},{}],30:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-text';
const pageName = 'docsPage';
const contName = 'makeCont';
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
  title:'Vegana Api : Engine Make Text',
  meta:[
    {
      name:'description',
      content:'how to add text to a dom element in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,text,add'
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

},{"./vDoc.json":31}],31:[function(require,module,exports){
module.exports={
  "template": [
    "2iyza5mwkm50399y"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.text"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api applies innter html text to a dom element."
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\n\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\"\n        }\n    }\n});\n\n//engine.make.text({id,text});\n\nengine.make.text({\n\tid:parent_div,\n    text:\"i am new text\"\n});\n\n"
            }
          }
        }
      }
    }
  }
}
},{}],32:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-textarea';
const pageName = 'docsPage';
const contName = 'makeCont';
const panelName = 'textareaPanel';

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
  title:'Vegana Api : Engine Make Textarea',
  meta:[
    {
      name:'description',
      content:'how to make a textarea input element in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,make,textarea,input'
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

},{"./vDoc.json":33}],33:[function(require,module,exports){
module.exports={
  "template": [
    "2iyza5mwkm50399y"
  ],
  "rows": {
    "2iyza5mwkm50399y": {
      "id": "2iyza5mwkm50399y",
      "template": [
        "2iyza5mwkm503cm6",
        "2iyza5mwkm503dmm",
        "2iyza5mwkm503e66"
      ],
      "containers": {
        "2iyza5mwkm503cm6": {
          "id": "2iyza5mwkm503cm6",
          "field": {
            "type": "heading",
            "data": {
              "value": "engine.make.textarea"
            }
          }
        },
        "2iyza5mwkm503dmm": {
          "id": "2iyza5mwkm503dmm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api makes a dom textarea element."
            }
          }
        },
        "2iyza5mwkm503e66": {
          "id": "2iyza5mwkm503e66",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst parent_div = engine.make.div({\n\tparent:pageId,\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\"\n        }\n    }\n});\n\n    const value_div = engine.make.div({\n        parent:parent_div,\n        text:'textarea input will be displayed here.',\n        draw:{\n            all:{\n                border:\"5px solid pink\",\n                padding:\"10px\"\n            }\n        }\n    });\n\n\tengine.make.textarea({\n    \tparent:parent_div,\n        placeholder:'this is a textarea example',\n        rows:10,\n        draw:{\n            all:{\n            \tdisplay:'block',\n                border:\"5px solid pink\",\n                width:'100%',\n                padding:\"10px\"\n            }\n        },\n        function:(id,value)=>{\n        \tengine.set.div.text(value_div,`textarea value : ${value}`);\n        }\n    });\n\n"
            }
          }
        }
      }
    }
  }
}
},{}]},{},[1]);
