(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-sketch';
const pageName = 'docsPage';
const contName = 'sketchCont';

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
  if(!data.panel){data.panel = 'colorsPanel';}

  require("./panels/colorsPanel/panel");
  require("./panels/fontsPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","sketchCont",data.panel);
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

},{"./panels/colorsPanel/panel":2,"./panels/fontsPanel/panel":4}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-colors';
const pageName = 'docsPage';
const contName = 'sketchCont';
const panelName = 'colorsPanel';

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
              "value": "engine.sketch.colors api"
            }
          }
        },
        "2iyza7uskm7vock6": {
          "id": "2iyza7uskm7vock6",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api manages your colors in your app."
            }
          }
        },
        "2iyza7uskm7vocvq": {
          "id": "2iyza7uskm7vocvq",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//======================================\n//set color\n//======================================\n\nengine.sketch.colors.add(\"red\",\"#f55742\");\n\n//======================================\n//get color\n//======================================\n\nlet redColor = engine.sketch.colors.get(\"red\");\n\n//======================================\n//example color\n//======================================\n\nengine.make.div({\n\tparent:pageId,\n    text:'test div',\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\",\n            color:redColor\n        }\n    }\n});\n"
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
const panelRef = '-panel-fonts';
const pageName = 'docsPage';
const contName = 'sketchCont';
const panelName = 'fontsPanel';

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
  title:'Vegana Api : Engine Sketch Fonts Api',
  meta:[
    {
      name:'description',
      content:'how to manage and share fonts in vegana js.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,sketch,fonts,add,get,manage'
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
              "value": "engine.sketch.fonts api"
            }
          }
        },
        "2iyza7uskm7vock6": {
          "id": "2iyza7uskm7vock6",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api manages your fonts in your app."
            }
          }
        },
        "2iyza7uskm7vocvq": {
          "id": "2iyza7uskm7vocvq",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//======================================\n//add color\n//======================================\n/*\n\n\t// add font api params\n    \n    engine.sketch.fonts.add(font_tag_string,font_name_string,location_url_string,is_global_boolean);\n    \n    1 font_tag_string can be used to get the font name by font get api.\n    \n    2 font_name_string will be the tag the font will be available in css and js render apis ie if the font name given is \"sampleFont\" you can use \"sampleFont\" in css to use this font.\n    \n    3 location_url_string \n    \n    \t- if font is hosted locally only relative path is required ie if the vegana app is hosted with some.com domain and font ia available at \tsome.com/css/font_1.ttf then the relative font path should be css/font_1.ttf\n    \n    4 is_global_boolean true if you use full url but if local defaults to false.\n\n*/\n\nconst load_font = await engine.sketch.fonts.add(\"sampleFont\",\"sample-font\",\"assets/fonts/Montserrat-Regular.ttf\")\n.then(()=>{\n\treturn true;\n})\n.catch(()=>{\n\treturn false;\n});\n\nconsole.log({load_font:load_font});\n\n//======================================\n//get color\n//======================================\n\nlet sampleFont = engine.sketch.fonts.get(\"sampleFont\");\n\nconsole.log({sampleFont:sampleFont});\n\n//======================================\n//use font with get api\n//======================================\n\nengine.make.div({\n\tparent:pageId,\n    text:'see my font',\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\",\n            //======================================\n            //used font with get api\n            'font-family':sampleFont\n            //======================================\n        }\n    }\n});\n\n//======================================\n//use font by name\n//======================================\n\nengine.make.div({\n\tparent:pageId,\n    text:'i used font name',\n    draw:{\n    \tall:{\n        \tborder:\"5px solid purple\",\n            padding:\"10px\",\n            //======================================\n            //used font name\n            'font-family':\"sample-font\"\n            //======================================\n        }\n    }\n});\n"
            }
          }
        }
      }
    }
  }
}
},{}]},{},[1]);
