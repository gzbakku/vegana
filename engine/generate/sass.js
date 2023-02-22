const common = require("../../common");
const io = require("../../io");

module.exports = {init:init};

async function init(type,compDir,laziness,modules){

    common.tell("generating sass file");

    let name;
    if(type === "page"){
        name = "page.scss"
    } else if(type === "cont"){
        name = "cont.scss"
    } else if(type === "panel"){
        name = "panel.scss"
    } else if(type === "globalComp" || type === "comp"){
        name = "comp.scss"
    } else {
        return true;
    }
    let path;
    if(laziness){
        path = compDir + "+" + name;
    } else {
        let process_parents = await check_if_parent_is_lazy(type,modules,compDir,name);
        if(process_parents === false){return common.error("failed-check_if_parent_is_lazy");} else
        if(typeof(process_parents) === 'string'){path = process_parents;} else {path = compDir + name;}
    }

    if(!await copy_file(path,laziness)){
        return common.error("failed-generate-sass_file-for_module");
    }
    if(laziness){
        common.tell("linking sass_variables.scss to modules sass file.");
        if(!await edit_file(path)){
            return common.error("failed-link-sass_variables_file");
        }
    } else {
        common.tell("linking sass file to vegana tree");
        if(!await global.sass_collect()){
            return common.error("failed-sass_collect");
        }
    }

    return true;

}

function sass_variables_path(path){
    let reverse = "";
    for(let item of io.clean_path(path).split("/").reverse()){
        if(item === "app"){break;}
        reverse += "../"
    }
    reverse = "@import '" + reverse + "sass/sass_variables.scss';";
    return reverse;
}

async function copy_file(path,laziness){
    let app_path = await io.dir.app();
    app_path = io.clean_path(app_path);
    let file_path = app_path + "/generate/";
    file_path += !laziness?"index.scss":"lazy_module.scss";
    if(!await io.copy(file_path,path)){
        return common.error("failed-access-sass_file_template");
    } else {return true;}
}

async function edit_file(path){
    let read = await io.read(path);
    if(!read){
        return common.error("failed-read-sass_file");
    }
    read = read.replace("//+++",sass_variables_path(path));
    if(!await io.write(path,read)){
        return common.error("failed-write-sass_file");
    } else {return true;}
}

async function check_if_parent_is_lazy(type,modules,base_path,name){

    common.tell("checking if parets are lazy");

    if(type === "page" || type === "globalComp" || type === "sass"){return null;}

    let base_dir = await io.dir.cwd();
    let lazyBook = await io.lazy.read();
    if(!lazyBook){
        return common.error("failed-read-lazy.json");
    }

    let lazy_file_path,lazy_module_type,compName;
    if(type === "cont"){
        if(lazyBook.pages){
            if(lazyBook.pages.indexOf(modules.page) >= 0){
                lazy_module_type = 'page';
                lazy_file_path = base_dir + "/app/pages/" + modules.page + "/+page.scss";
                compName = modules.name + "Cont";
            }
        }
    } else
    if(type === "panel"){
        if(
            lazyBook.conts &&
            lazyBook.conts.hasOwnProperty(modules.page) &&
            lazyBook.conts[modules.page].indexOf(modules.cont) >= 0
        ){
            compName = modules.name + "Panel";
            lazy_module_type = 'cont';
            lazy_file_path = base_dir + "/app/pages/" + modules.page + "/conts/" + modules.cont + "/+cont.scss";
        } else if(
            lazyBook.pages &&
            lazyBook.pages.indexOf(modules.page) >= 0
        ){
            compName = modules.name + "Panel";
            lazy_module_type = 'page';
            lazy_file_path = base_dir + "/app/pages/" + modules.page + "/+page.scss";
        }
    } else
    if(type === "comp"){

        let name = modules.name;
        modules = parse_path(base_path);
        modules.name = name;
        if(
            modules.page && modules.cont && modules.panel &&
            lazyBook.panels &&
            lazyBook.panels.hasOwnProperty(modules.page) &&
            lazyBook.panels[modules.page].hasOwnProperty(modules.cont) &&
            lazyBook.panels[modules.page][modules.cont].indexOf(modules.panel) >= 0
        ){
            compName = modules.name + "Panel";
            lazy_module_type = 'panel';
            lazy_file_path = base_dir + "/app/pages/" + modules.page + "/conts/" + modules.cont + "/panels/" + modules.panel + "/+panel.scss";
        } else if(
            modules.page && modules.cont && !modules.panel &&
            lazyBook.conts.hasOwnProperty(modules.page) &&
            lazyBook.conts[modules.page].indexOf(modules.cont) >= 0
        ){
            compName = modules.name + "Cont";
            lazy_module_type = 'cont';
            lazy_file_path = base_dir + "/app/pages/" + modules.page + "/conts/" + modules.cont + "/+cont.scss";
        } else if(
            modules.page && !modules.cont && !modules.panel &&
            lazyBook.pages.indexOf(modules.page) >= 0
        ){
            compName = modules.name + "Page";
            lazy_module_type = 'page';
            lazy_file_path = base_dir + "/app/pages/" + modules.page + "/+page.scss";
        } else if(
            modules.global &&
            lazyBook.globals.indexOf(modules.global) >= 0
        ){
            compName = modules.name + "Comp";
            lazy_module_type = 'global';
            lazy_file_path = base_dir + "/app/globals/" + modules.global + "/+comp.scss";
        } else {
            // this will include the comp in global vegana_tree
            return true;
        }
    } else {
        return true;
    }

    if(!lazy_file_path){return true;}
    if(true){
        let message = 'this ' + type + " is part of the " + lazy_module_type + " " + modules[lazy_module_type] + " which is lazy, do you want to link sass file for this " + type + " to its lazy parent module " + modules[lazy_module_type];
        if(!await input.confirm(message)){
            if(await input.confirm("do you want to add current modules sass file to vegana_tree")){
                return true;
            } else {
                return base_path + "@" + type + ".scss";
            }
        }
    }

    common.tell("linking sass for this module to parent module's sass file");

    if(!await io.exists(lazy_file_path)){
        common.tell("generating lazy parent modules sass file");
        if(!await copy_file(lazy_file_path,true)){
            return common.error("failed-generate-sass_file-for_module");
        }
        if(!await edit_file(lazy_file_path)){
            return common.error("failed-link-sass_variables_file");
        }
    }

    let read = await io.read(lazy_file_path);
    if(!read){return common.error("failed-read-parent_sass_file => " + lazy_file_path);}

    let path_to_child;
    if(lazy_module_type === "cont"){
        if(type === "panel"){
            path_to_child = './panels/' + modules.name + "Panel/@panel.scss";
        }
    } else
    if(lazy_module_type === "page"){
        if(type === "cont"){
            path_to_child = './conts/' + modules.name + "Cont/@cont.scss";
        }
        if(type === "panel"){
            path_to_child = './conts/' + modules.cont + "/panels/" + modules.name + "Panel/@panel.scss";
        }
    }
    if(type === "comp"){
        let comp_path = base_path + "@comp.scss";
        if(lazy_module_type === "global"){path_to_child = extract_path(modules.global,comp_path);} else
        if(lazy_module_type === "page"){path_to_child = extract_path(modules.page,comp_path);} else
        if(lazy_module_type === "cont"){path_to_child = extract_path(modules.cont,comp_path);} else
        if(lazy_module_type === "panel"){path_to_child = extract_path(modules.panel,comp_path);}
    }

    let toAdd = "@import '" + path_to_child + "';"
    let children_replacer = "//+++children+++";
    if(read.indexOf(children_replacer) >= 0){
      toAdd += "\n" + children_replacer
      read = read.replace(children_replacer,toAdd);
    } else {
      read += '\n' + toAdd;
    }

    if(!await io.write(lazy_file_path,read)){
        return common.error("failed-link_sass_to_parent_module");
    } else {
        common.success("sass file for this module is linked to " + lazy_file_path);
        return base_path + "@" + type + ".scss";
    }

}

function extract_path(anchor,path){
    let collect = '.',do_collect = false;
    for(let place of path.split("/")){
        if(do_collect){collect += "/" + place;}
        if(place === anchor){do_collect = true;}
    }
    return collect;
}

function parse_path(path){
    let modules = {page:null,cont:null,panel:null,global:null};
    let collect;
    for(let place of path.split("/")){
        if(collect){
            if(collect === 'global'){modules.global = place;} else
            if(collect === 'pages'){modules.page = place;} else
            if(collect === 'conts'){modules.cont = place;} else
            if(collect === 'panels'){modules.panel = place;}
            collect = null;
        } else {
            if(place === "globals"){collect = 'global';} else
            if(place === "pages"){collect = 'pages';} else
            if(place === "conts"){collect = 'conts';} else
            if(place === "panels"){collect = 'panels';}
        }
    }
    return modules;
}
