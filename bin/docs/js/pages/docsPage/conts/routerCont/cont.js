(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-router';
const pageName = 'docsPage';
const contName = 'routerCont';

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
  require("./panels/compPanel/panel");
  require("./panels/pagePanel/panel");
  require("./panels/contPanel/panel");
  require("./panels/panelPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","routerCont",data.panel);
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

},{"./panels/compPanel/panel":2,"./panels/contPanel/panel":4,"./panels/introPanel/panel":6,"./panels/pagePanel/panel":8,"./panels/panelPanel/panel":10}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-comp';
const pageName = 'docsPage';
const contName = 'routerCont';
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
  title:'Vegana Api : Engine Router Comp',
  meta:[
    {
      name:'description',
      content:'how to route to a comp module in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,router,comp,init,make,to,new'
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
    "2iyza37wkm613isc"
  ],
  "rows": {
    "2iyza37wkm613isc": {
      "id": "2iyza37wkm613isc",
      "template": [
        "2iyza37wkm613jqs",
        "2iyza37wkm613r44",
        "2iyza37wkm613rk4"
      ],
      "containers": {
        "2iyza37wkm613jqs": {
          "id": "2iyza37wkm613jqs",
          "field": {
            "type": "heading",
            "data": {
              "value": "vegana comp module router"
            }
          }
        },
        "2iyza37wkm613r44": {
          "id": "2iyza37wkm613r44",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "\nvegana comp module can be routed on comp router all needed steps to make a comp router and navigate to are given below please follow all steps."
            }
          }
        },
        "2iyza37wkm613rk4": {
          "id": "2iyza37wkm613rk4",
          "field": {
            "type": "code",
            "data": {
              "value": "\n\n//-----------------------------------\n//\tmake comp module\n//-----------------------------------\n/*\n\n\t//you can make comp module with vegana cli\n    //for more information see the cli documents\n    \n    $ vegana generate comp first\n    \n    $ vegana generate comp second\n\n*/\n\n//-----------------------------------\n//\tmake comp router\n//-----------------------------------\n/*\n\n\t//router params\n    \n    engine.router.init.comps(parent_element_id_string,comp_module_object,{data_to_pass},\"router_class_string\")\n\n*/\n\nconst firstComp = require(\"./comps/firstComp/comp\");\nconst secondComp = require(\"./comps/secondComp/comp\");\n\nlet router_id = engine.router.init.comps(pageId,firstComp,{some:true},\"router-class\");\n\n//-----------------------------------\n//\troute to new comp\n//-----------------------------------\n/*\n\n\t//navigator params\n    \n    engine.router.navigate.to.comp(comp_module_object,{data_to_pass},router_is_string)\n\n*/\n\n//route to prebuilt or new comp module\nengine.router.navigate.to.comp(secondComp,{data_to_pass},router_id);\n\n//rebuild comp module\n//this api removes the old comp module body and makes a new one\nengine.router.navigate.new.comp(secondComp,{data_to_pass},router_id);\n\n//-----------------------------------\n//\tthis wont execute here\n//-----------------------------------\n"
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
const panelRef = '-panel-cont';
const pageName = 'docsPage';
const contName = 'routerCont';
const panelName = 'contPanel';

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
  title:'Vegana Api : Engine Router Cont',
  meta:[
    {
      name:'description',
      content:'how to route to a cont module in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,router,cont,init,make,to,new'
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
    "2iyza37wkm613isc"
  ],
  "rows": {
    "2iyza37wkm613isc": {
      "id": "2iyza37wkm613isc",
      "template": [
        "2iyza37wkm613jqs",
        "2iyza37wkm613r44",
        "2iyza37wkm613rk4"
      ],
      "containers": {
        "2iyza37wkm613jqs": {
          "id": "2iyza37wkm613jqs",
          "field": {
            "type": "heading",
            "data": {
              "value": "vegana cont module router"
            }
          }
        },
        "2iyza37wkm613r44": {
          "id": "2iyza37wkm613r44",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "\nvegana cont module can be routed on cont router all needed steps to navigate are given below please follow all steps."
            }
          }
        },
        "2iyza37wkm613rk4": {
          "id": "2iyza37wkm613rk4",
          "field": {
            "type": "code",
            "data": {
              "value": "\n\n//-----------------------------------\n//\tmake cont module\n//-----------------------------------\n/*\n\n\t//you can make cont module with vegana cli\n    //for more information see the cli documents\n    \n    $ vegana generate cont first\n    \n    $ vegana generate cont second\n\n*/\n\n//-----------------------------------\n//\tmake cont router\n//-----------------------------------\n/*\n\n\tthis router should be made on a page module only.\n\n\trouter params\n    \n    engine.router.init.conts(page_id_string,router_class_string);\n\n*/\n\nengine.router.init.conts(pageId,\"conts-router-class\");\n\n//-----------------------------------\n//\tintegrate cont\n//-----------------------------------\n/*\n\n\tthe cont module will integrate automatically once you require it in your page module.\n    \n    cont module should only be loaded in there parent page.\n\n*/\n\n\nrequire(\"./conts/firstCont/cont\");\n\n//-----------------------------------\n// integrate lazy cont\n//-----------------------------------\n/*\n\n\tlazy cont first are neede to be loaded on to the app.\n\n*/\n\nconst loadFirstCont = await engine.loader.load.cont(\"firstPage\",\"firstCont\")\n.then(()=>{\n\treturn true;\n})\n.catch(()=>{\n\treturn false;\n});\n\n//-----------------------------------\n// get cont modules\n//-----------------------------------\n/*\n\n\tcall the contModule sub-api in get api of engine to get contModule.\n\n*/\n\nlet firstCont = engine.get.contModule(\"firstPage\",\"firstCont\");\n\n//-----------------------------------\n//\troute to new cont\n//-----------------------------------\n/*\n\n\t//navigator params\n    \n    engine.router.navigate.to.cont(cont_module_object,{data_to_pass})\n\n*/\n\n//route to prebuilt or new cont module\nengine.router.navigate.to.cont(firstCont,{data_to_pass});\n\n//rebuild page module\n//this api removes the old cont module body and makes a new one.\nengine.router.navigate.new.cont(firstCont,{data_to_pass});\n\n//-----------------------------------\n//\tthis wont execute here\n//-----------------------------------\n"
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
const contName = 'routerCont';
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
  title:'Vegana Api : Engine Router Introduction',
  meta:[
    {
      name:'description',
      content:'introduction to vegana js router.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,router,introduction'
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
    "2iyzacm8km64dhta"
  ],
  "rows": {
    "2iyzacm8km64dhta": {
      "id": "2iyzacm8km64dhta",
      "template": [
        "2iyzacm8km64djwv",
        "2iyzacm8km64dwem"
      ],
      "containers": {
        "2iyzacm8km64djwv": {
          "id": "2iyzacm8km64djwv",
          "field": {
            "type": "heading",
            "data": {
              "value": "Vegana Router"
            }
          }
        },
        "2iyzacm8km64dwem": {
          "id": "2iyzacm8km64dwem",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "\nvegana router system is designed to make a app fast to load and browse so a page is divided into multiple diffrent components which can be lazy loaded to make a fast experience for user.\n\nbasic vegana components are  :-\n\n-page\n -cont\n  -panel\n  \n--comp  \n  \neach html document is made of page module at the top this page can be routed to diffrent pages to make the browsing experince friction less. the user never leaves a active page ever.\n\neach page is built of cont modules, these can be sections of a page ie for a article page it can be main article cont, writer profile cont and comments cont, all these conts can be loaded lazyely this makes the initial app size tiny and makes it load faster, the later conts can le loaded as there parent conts are created.\n\nthese conts can also be routed in a cont router, this router can provide a page flexibility to provide many features through one collection of modules ie a settings page might have sections that shows through a router like profile, security, data, notifications etc, by giving  a page ability to lazy load these conts the initial page size again can become tiny and only that be loaded which is used by the user.\n\nconts are made of panels again these panels can either be used in a structral or routable model these can be applied to load even further extension for a page ie settings page may have diffrent sections like profile picture, data or password for these section lazy load can reduce page size even further.\n\nbut a user might need even deeper or shalow structural template for this you can use comp modules these modules are parent agnostic and can be produced anywhere but can also be used in a router sesstings these modules can also be lazy.\n\nthis much flexibility allows you to only load what the user needs for a task this reduces bloat and makes your app extreamly fast.\n"
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
const panelRef = '-panel-page';
const pageName = 'docsPage';
const contName = 'routerCont';
const panelName = 'pagePanel';

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
  title:'Vegana Api : Engine Router Page',
  meta:[
    {
      name:'description',
      content:'how to route to a page module in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,router,page,init,make,to,new'
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
    "2iyza37wkm613isc"
  ],
  "rows": {
    "2iyza37wkm613isc": {
      "id": "2iyza37wkm613isc",
      "template": [
        "2iyza37wkm613jqs",
        "2iyza37wkm613r44",
        "2iyza37wkm613rk4"
      ],
      "containers": {
        "2iyza37wkm613jqs": {
          "id": "2iyza37wkm613jqs",
          "field": {
            "type": "heading",
            "data": {
              "value": "vegana page module router"
            }
          }
        },
        "2iyza37wkm613r44": {
          "id": "2iyza37wkm613r44",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "\nvegana page module can be routed on page router all needed steps to navigate are given below please follow all steps."
            }
          }
        },
        "2iyza37wkm613rk4": {
          "id": "2iyza37wkm613rk4",
          "field": {
            "type": "code",
            "data": {
              "value": "\n\n//-----------------------------------\n//\tmake page module\n//-----------------------------------\n/*\n\n\t//you can make page module with vegana cli\n    //for more information see the cli documents\n    \n    $ vegana generate page first\n    \n    $ vegana generate page second\n\n*/\n\n//-----------------------------------\n//\tintegrate page\n//-----------------------------------\n/*\n\n\tthe page module will integrate automatically once you require it in your page.\n\n*/\n\n\nrequire(\"./pages/firstPage/page\");\n\n//-----------------------------------\n// integrate lazy page\n//-----------------------------------\n/*\n\n\tlazy page first are neede to be loaded on to the app index.\n\n*/\n\nconst loadFirstPage = await engine.loader.load.page(\"firstPage\")\n.then(()=>{\n\treturn true;\n})\n.catch(()=>{\n\treturn false;\n});\n\n//-----------------------------------\n// get page modules\n//-----------------------------------\n/*\n\n\tcall the pageModule sub-api in get api of engine to get pageModule.\n\n*/\n\nlet firstPage = engine.get.pageModule(\"firstPage\");\n\n//-----------------------------------\n//\troute to new page\n//-----------------------------------\n/*\n\n\t//navigator params\n    \n    engine.router.navigate.to.page(page_module_object,{data_to_pass})\n\n*/\n\n//route to prebuilt or new page module\nengine.router.navigate.to.page(firstPage,{data_to_pass});\n\n//rebuild page module\n//this api removes the old page module body and makes a new one\nengine.router.navigate.new.page(firstPage,{data_to_pass});\n\n//-----------------------------------\n//\tthis wont execute here\n//-----------------------------------\n"
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
const panelRef = '-panel-panel';
const pageName = 'docsPage';
const contName = 'routerCont';
const panelName = 'panelPanel';

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
  title:'Vegana Api : Engine Router Panel',
  meta:[
    {
      name:'description',
      content:'how to route to a panel module in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,router,panel,init,make,to,new'
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
    "2iyza37wkm613isc"
  ],
  "rows": {
    "2iyza37wkm613isc": {
      "id": "2iyza37wkm613isc",
      "template": [
        "2iyza37wkm613jqs",
        "2iyza37wkm613r44",
        "2iyza37wkm613rk4"
      ],
      "containers": {
        "2iyza37wkm613jqs": {
          "id": "2iyza37wkm613jqs",
          "field": {
            "type": "heading",
            "data": {
              "value": "vegana panel module router"
            }
          }
        },
        "2iyza37wkm613r44": {
          "id": "2iyza37wkm613r44",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "\nvegana panel module can be routed on panel router all needed steps to navigate are given below please follow all steps."
            }
          }
        },
        "2iyza37wkm613rk4": {
          "id": "2iyza37wkm613rk4",
          "field": {
            "type": "code",
            "data": {
              "value": "\n\n//-----------------------------------\n//\tmake panel module\n//-----------------------------------\n/*\n\n\t//you can make panel module with vegana cli\n    //for more information see the cli documents\n    \n    $ vegana generate panel first\n    \n    $ vegana generate panel second\n\n*/\n\n//-----------------------------------\n//\tmake panel router\n//-----------------------------------\n/*\n\n\tthis router should only be made on the cont module\n\n\trouter params\n    \n    engine.router.init.panels(cont_id_string,router_class_string);\n\n*/\n\nengine.router.init.panels(contId,\"panel-router-class\");\n\n//-----------------------------------\n//\tintegrate panel\n//-----------------------------------\n/*\n\n\tthe panel module will integrate automatically once you require it in your cont module.\n    \n    panel module should only be loaded in there parent cont module.\n\n*/\n\n\nrequire(\"./panels/firstPanel/panel\");\n\n//-----------------------------------\n// integrate lazy panel\n//-----------------------------------\n/*\n\n\tlazy panel first are neede to be loaded on to the app.\n\n*/\n\nconst loadFirstPanel = await engine.loader.load.panel(\"firstPage\",\"firstCont\",\"firstPanel\")\n.then(()=>{\n\treturn true;\n})\n.catch(()=>{\n\treturn false;\n});\n\n//-----------------------------------\n// get panel modules\n//-----------------------------------\n/*\n\n\tcall panelModule sub-api in get api of engine to get panelModule.\n\n*/\n\nlet firstPanel = engine.get.panelModule(\"firstPage\",\"firstCont\",\"firstPanel\");\n\n//-----------------------------------\n//\troute to new panel\n//-----------------------------------\n/*\n\n\t//navigator params\n    \n    engine.router.navigate.to.panel(panel_module_object,{data_to_pass})\n\n*/\n\n//route to prebuilt or new panel module\nengine.router.navigate.to.panel(firstPanel,{data_to_pass});\n\n//rebuild panel module\n//this api removes the old panel module body and makes a new one.\nengine.router.navigate.new.panel(firstPanel,{data_to_pass});\n\n//-----------------------------------\n//\tthis wont execute here\n//-----------------------------------\n"
            }
          }
        }
      }
    }
  }
}
},{}]},{},[1]);
