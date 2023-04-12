const common = require("../../common");
const sass = require("./sass");

module.exports = {

    get_file_type:(path)=>{
        if(
            path.indexOf("/app/wasm/") >= 0 &&
            path.indexOf(".rs") >= 0
        ){return "wasm";}
        let hold = io.clean_path(path).split("/");
        let last = hold[hold.length - 1];
        if(last.indexOf(".") < 0){return false;}
        let file_hold = last.split(".");
        if(file_hold.length === 1){return false;}
        let file_type = file_hold[file_hold.length - 1];
        if(file_type === "js" && path.indexOf("/app/wasm/") < 0){return 'js';} else
        if(file_type === "scss"){return 'sass';} else
        if(file_type === "json"){return 'json';}
        else{return false;}
    },

    get_location:(path)=>{
        let hold = io.clean_path(path).split("/");
        for(let item of hold){
            if(item === "globals"){return 'globals';} else
            if(item === "commonComps"){return 'commonComps';} else
            if(item === "pages"){return 'pages';} else
            if(item === "ui"){return 'ui';} else
            if(item === "wasm"){return 'wasm';} else
            if(item === "snippets.js"){return 'snippets';}
        }
    },

    get_sass_type:(path)=>{
        let hold = io.clean_path(path).split("/");
        let last = hold[hold.length - 1];
        if(last.indexOf(".") < 0){return false;}
        let file_hold = last.split(".");
        if(file_hold.length === 1){return false;}
        let file_name = file_hold[0];
        if(file_name[0] === "+"){return "lazy";} else
        if(file_name[0] === "@"){return "included";} else
        if(file_name[0] === "!"){return "ignored";} else {
            return "tree";
        }
    },

    get_parents:(path)=>{

        let modules = {page:null,cont:null,panel:null,global:null,wasm:null,ui:null};

        let collect;
        for(let place of path.split("/")){
            if(collect){
                if(collect === 'ui'){modules.ui = place;} else
                if(collect === 'wasm'){modules.wasm = place;} else
                if(collect === 'global'){modules.global = place;} else
                if(collect === 'pages'){modules.page = place;} else
                if(collect === 'conts'){modules.cont = place;} else
                if(collect === 'panels'){modules.panel = place;}
                collect = null;
            } else {
                if(place === "ui"){collect = 'ui';} else
                if(place === "wasm"){collect = 'wasm';} else
                if(place === "globals"){collect = 'global';} else
                if(place === "pages"){collect = 'pages';} else
                if(place === "conts"){collect = 'conts';} else
                if(place === "panels"){collect = 'panels';}
            }
        }

        return modules;

    },

    get_module_type:(path)=>{
        if(path.indexOf("/themes/") >= 0){return "theme";} else
        if(path.indexOf("stylesheet.json") >= 0){return "stylesheet";} else
        if(path.indexOf("snippets.js") >= 0){return "snippets";} else
        if(path.indexOf("/app/ui") >= 0){return "ui";} else
        if(path.indexOf("/app/wasm") >= 0){return "wasm";} else
        if(path.indexOf("globalComp.") >= 0){return "globalComp";} else
        if(path.indexOf("comp.") >= 0){return "comp";} else
        if(path.indexOf("page.") >= 0){return "page";} else
        if(path.indexOf("cont.") >= 0){return "cont";} else
        if(path.indexOf("panel.") >= 0){return "panel";} else
        if(path.indexOf(".json") >= 0){return "json";}
    },

    get_lazy_parent:(type,parents,lazyBook)=>{

        if(parents.wasm){
            return {type:"wasm",name:parents.wasm};
        } else if(parents.global){
            return {type:'global',name:parents.global};
        } else if(//check panel
            parents.page && parents.cont && parents.panel &&
            lazyBook.panels &&
            lazyBook.panels.hasOwnProperty(parents.page) &&
            lazyBook.panels[parents.page].hasOwnProperty(parents.cont) &&
            lazyBook.panels[parents.page][parents.cont].indexOf(parents.panel) >= 0
        ){
            return {type:'panel',name:parents.panel};
        } else if(//check cont
            parents.page && parents.cont &&
            lazyBook.conts &&
            lazyBook.conts.hasOwnProperty(parents.page) &&
            lazyBook.conts[parents.page].indexOf(parents.cont) >= 0
        ){
            return {type:'cont',name:parents.cont};
        } else if(//check page
            parents.page &&
            lazyBook.pages &&
            lazyBook.pages.indexOf(parents.page) >= 0
        ){
            return {type:'page',name:parents.page};
        } else if(typeof(parents.ui) === "string"){
            return {type:"ui",name:parents.ui};
        }else {//any other including ui module
            return {type:"app"};
        }

    },//get_lazy_parent

    compile_lazy_sass:async (lazy,parents)=>{

      // console.log({
      //   lazy:lazy,
      //   parents:parents,
      //   file_path:file_path
      // });

      let base_dir = io.dir.cwd(),name,writeLocation;
      if(lazy.type === "page"){
        writeLocation = base_dir + "/css/pages/" + lazy.name + "/";
        readLocation = base_dir + "/app/pages/" + lazy.name + "/+page.scss";
        name = "page.css";
      } else if(lazy.type === "cont"){
        writeLocation = base_dir + "/css/pages/" + parents.page + "/conts/" + lazy.name + "/";
        readLocation = base_dir + "/app/pages/" + parents.page + "/conts/" + lazy.name + "/+cont.scss";
        name = "cont.css";
      } else if(lazy.type === "panel"){
        writeLocation = base_dir + "/css/pages/" + parents.page + "/conts/" + parents.cont + "/panels/" + lazy.name + "/";
        readLocation = base_dir + "/app/pages/" + parents.page + "/conts/" + parents.cont + "/panels/" + lazy.name + "/+panel.scss";
        name = "panel.css";
      } else if(lazy.type === "global"){
        writeLocation = base_dir + "/css/globals/" + lazy.name + "/";
        readLocation = base_dir + "/app/globals/" + lazy.name + "/+comp.scss";
        name = "comp.css";
      } else if(lazy.type === "ui"){
        writeLocation = base_dir + "/css/ui/" + lazy.name + "/";
        readLocation = base_dir + "/app/ui/" + lazy.name + "/@lazy.scss";
        name = "lazy.css";
      } else {
        return common.error("invalid sass module type");
      }

      if(!await io.dir.ensure(writeLocation)){return common.error("failed-ensure-write_location-directory");}
      const do_render = await sass.render(readLocation,writeLocation + name)
      .then(()=>{
        common.success(`sass module for ${lazy.type} updated`);
        return true;
      })
      .catch((e)=>{console.error(e);return false;});
      if(!do_render){return common.error("render failed");} else {return true;}
    },

    extract_sass_pack:async (path)=>{
        if(path.indexOf("/sass/sassPack/") < 0){return false;}
        let do_collect = false,packName;
        for(let part of path.split("/")){
            if(do_collect){packName = part;break;}
            if(part === "sassPack"){do_collect = true;}
        }
        if(!packName){return false;}
        let base_path = await io.dir.cwd();
        let readPath = base_path + "/sass/sassPack/" + packName + "/pack.scss";
        let writePath = base_path + "/css/sassPack/" + packName + "/pack.css";
        const do_render = await sass.render(readPath,writePath)
        .then(()=>{return true;})
        .catch((e)=>{console.error(e);return false;});
        if(!do_render){return common.error("render failed");} else {return true;}
    }

};
