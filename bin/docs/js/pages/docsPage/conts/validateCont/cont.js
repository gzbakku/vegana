(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//controllers
const log = false;                  //set this const to true to log common tell inputs
const type = 'cont';
const contRef = '-cont-validate';
const pageName = 'docsPage';
const contName = 'validateCont';

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
  if(!data.panel){data.panel = 'emailPanel';}

  require("./panels/emailPanel/panel");
  require("./panels/jsonPanel/panel");

  engine.router.init.panels(contId);
  let mod = engine.get.panelModule("docsPage","validateCont",data.panel);
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

},{"./panels/emailPanel/panel":2,"./panels/jsonPanel/panel":4}],2:[function(require,module,exports){
//controllers
const log = false;
const type = 'panel';
const panelRef = '-panel-email';
const pageName = 'docsPage';
const contName = 'validateCont';
const panelName = 'emailPanel';

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
  title:'Vegana Api : Engine Validate Email',
  meta:[
    {
      name:'description',
      content:'how api regex checks a stringif it is a email or not.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,validate,email,string,schema,regex'
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
              "value": "engine.validate.email api"
            }
          }
        },
        "2iyza7uskm7vock6": {
          "id": "2iyza7uskm7vock6",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api regex checks a string to be a valid email."
            }
          }
        },
        "2iyza7uskm7vocvq": {
          "id": "2iyza7uskm7vocvq",
          "field": {
            "type": "code",
            "data": {
              "value": "\nconst check = engine.validate.email(\"gzbakku@gmail.com\");\n\nconsole.log({\n\temail_check:check\n});\n\n"
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
const panelRef = '-panel-json';
const pageName = 'docsPage';
const contName = 'validateCont';
const panelName = 'jsonPanel';

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
  title:'Vegana Api : Engine Validate Json Api',
  meta:[
    {
      name:'description',
      content:'this api checks a json object against a given data structure.'
    },
    {
      name:'keywords',
      content:'vegana,api,engine,validate,json,schema,body,structure'
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
    "2iyza7uskm7vo9oe",
    "2iyza2twkmh5brt6",
    "2iyza2twkmh5cuqa",
    "2iyza2twkmh5d8q2",
    "2iyza2twkmh5dl89",
    "2iyza2twkmh5e16q"
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
              "value": "engine.validate.json api"
            }
          }
        },
        "2iyza7uskm7vock6": {
          "id": "2iyza7uskm7vock6",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this api checks a json object against a given data structure."
            }
          }
        },
        "2iyza7uskm7vocvq": {
          "id": "2iyza7uskm7vocvq",
          "field": {
            "type": "code",
            "data": {
              "value": "\n//==================================\n//api arguments\n//==================================\n/*\n\n\t//----------------\n    \n\tengine.validate.json(\n    \tschema_object,\n        data_object,\n        data_object_size_limit,\n        max_num_of_keys_in_data,\n        return_error_boolean\n    );\n    \n    //----------------\n    \n    1. schema_object is a native object to match the data\n    \n    2. data_object is obvious data to check,\n    \n    3. data_object_size_limit the size of the data might is diffrent with each request so there are 2 checks \"dynamic\" and \"static\"\n    \n    \t-default is static\n        \n        -static check matches all the key any missing or addional keys will fail the test\n        \n        -dynamic will only ignore the keys that are marked elective if they are not present in data.\n        \n    4. max_num_of_keys_in_data is obvios max number of keys in the data object \n    \n    5. turn_error_boolean default the validate api returns false boolean but if a error stringis needed this boolean can be set to true to get it on error.\n    \n*/\n\n//==================================\n//static validation\n//==================================\n\nconst static_object = {\n\taccount_type:'admin',\n\tname:\"akku\",\n    id:12,\n    email:'gzbakku@gmail.com',\n    token:{\n    \ttime:456456446545,\n        id:'ds9898989898'\n    }\n};\n\nconst static_schema = {\n\taccount_type:{type:'string',options:['admin','user']},\n\tname:{type:'string',min:3,max:256},\n    id:{type:'number',min:1,max:256},\n    email:{type:'email',min:3,max:256},\n    token:{type:'object',validate:{\n    \tschema:{\n        \ttime:{type:'number',max:45645644654523},\n            id:{type:'string',max:256}\n        },\n        dynamic:false,\n        maxSize:2\n    }},\n};\n\nconst static_validate = engine.validate.json(static_schema,static_object);\n\nconsole.log({static_validate:static_validate});\n\n//==================================\n//\tdynamic validation\n//==================================\n\nconst dynamic_object = {\n\tis_admin:true,\n\tname:\"akku\",\n    id:12\n};\n\nconst dynamic_schema = {\n\tis_admin:{type:'boolean'},\n    name:{type:'string'},\n    id:{type:'number'},\n    email:{type:'email',elective:true},\n    token:{type:'object',elective:true}\n};\n\nconst dynamic_validate = engine.validate.json(dynamic_schema,dynamic_object,\"dynamic\",5);\n\nconsole.log({dynamic_validate:dynamic_validate});\n\n//==================================\n//\tfail case\n//==================================\n\nconst fail_object = {\n\tis_admin:true,\n\tname:\"akku\"\n};\n\nconst fail_schema = {\n\tis_admin:{type:'boolean'},\n    name:{type:'string'},\n    id:{type:'number'}\n};\n\nconst fail_validate = engine.validate.json(fail_schema,fail_object,\"static\",3,true);\n\nconsole.log({fail_validate:fail_validate});\n"
            }
          }
        }
      }
    },
    "2iyza2twkmh5brt6": {
      "id": "2iyza2twkmh5brt6",
      "template": [
        "2iyza2twkmh5btk2",
        "2iyza2twkmh5byjm"
      ],
      "containers": {
        "2iyza2twkmh5btk2": {
          "id": "2iyza2twkmh5btk2",
          "field": {
            "type": "heading",
            "data": {
              "value": "type validation parameter"
            }
          }
        },
        "2iyza2twkmh5byjm": {
          "id": "2iyza2twkmh5byjm",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "1 string\n2 number\n3 object\n4 email\n5 array\n\ntype param takes the given options as a value and check the data type of be the exact same for the given value in data to be validated\n\nSpecial Functions\n\n1 String Field\n\n\tstring field can check value against a array of string any value not in the array will fail. \n\n2 Object Field\n\t\n    Object Fields can validate the value of object against a validate object\n    \n    {\n    \tshchema:schema_object,\n        maxSize:max_num_of_keys_in_data,\n        dynamic:boolean,\n        returnError:boolean\n    }"
            }
          }
        }
      }
    },
    "2iyza2twkmh5cuqa": {
      "id": "2iyza2twkmh5cuqa",
      "template": [
        "2iyza2twkmh5cwld",
        "2iyza2twkmh5cwzd"
      ],
      "containers": {
        "2iyza2twkmh5cwld": {
          "id": "2iyza2twkmh5cwld",
          "field": {
            "type": "heading",
            "data": {
              "value": "Min validation parameter"
            }
          }
        },
        "2iyza2twkmh5cwzd": {
          "id": "2iyza2twkmh5cwzd",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "min parameter check the string,array,number or object keys length to be equal or higher to the number given as a value to this parameter in the schema to be the same of that given in the data to be validated. caution :- for any given number the validation checks if the number is less or equal to the given number not the length of the number.\n\ncaution :- for any given number the validation checks if the number is less or equal to the given number not the length of the number."
            }
          }
        }
      }
    },
    "2iyza2twkmh5d8q2": {
      "id": "2iyza2twkmh5d8q2",
      "template": [
        "2iyza2twkmh5d9pd",
        "2iyza2twkmh5da81"
      ],
      "containers": {
        "2iyza2twkmh5d9pd": {
          "id": "2iyza2twkmh5d9pd",
          "field": {
            "type": "heading",
            "data": {
              "value": "Max validation parameter"
            }
          }
        },
        "2iyza2twkmh5da81": {
          "id": "2iyza2twkmh5da81",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "max parameter check the string,array,number or object keys length to be equal or lower to the number given as a value to this parameter in the schema to be the same of that given in the data to be validated."
            }
          }
        }
      }
    },
    "2iyza2twkmh5dl89": {
      "id": "2iyza2twkmh5dl89",
      "template": [
        "2iyza2twkmh5dnqq",
        "2iyza2twkmh5dsex"
      ],
      "containers": {
        "2iyza2twkmh5dnqq": {
          "id": "2iyza2twkmh5dnqq",
          "field": {
            "type": "heading",
            "data": {
              "value": "Options validation parameter"
            }
          }
        },
        "2iyza2twkmh5dsex": {
          "id": "2iyza2twkmh5dsex",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "options parametere can only be given to the string data type and it checks if the given value in the data is present in the array provided in the schema."
            }
          }
        }
      }
    },
    "2iyza2twkmh5e16q": {
      "id": "2iyza2twkmh5e16q",
      "template": [
        "2iyza2twkmh5e21t",
        "2iyza2twkmh5e2cx"
      ],
      "containers": {
        "2iyza2twkmh5e21t": {
          "id": "2iyza2twkmh5e21t",
          "field": {
            "type": "heading",
            "data": {
              "value": "elective validation parameter"
            }
          }
        },
        "2iyza2twkmh5e2cx": {
          "id": "2iyza2twkmh5e2cx",
          "field": {
            "type": "paragraph",
            "data": {
              "value": "this parametere if given as true ingnores if the data is not present in the data to be validated."
            }
          }
        }
      }
    }
  }
}
},{}]},{},[1]);
