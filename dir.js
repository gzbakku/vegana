
const get_npm_root = require("get_npm_root");
const fs = require("node:fs/promises");

module.exports = {
    root:root,
    select_file:select_file,
    select_dir:select_dir,
    get_dir_items:get_dir_items,
    remove_dir:remove_dir
};

async function remove_dir(path){
    return fs.rm(path,{
        force:true,
        recursive:true
    })
    .then((v)=>{
        return true;
    })
    .catch((e)=>{
        return common.error(`failed remove file => ${path} => ${e}`);
    });
}

async function root(app){
    return `${await get_npm_root()}/${app||"vegana"}`;
}

async function select_file(base_dir){

    let dir = await select_dir(base_dir);
    let items = await get_dir_items(dir);
    let files = items.files;

    if(files.length === 0){
        return common.error(`there are no files in current directory => ${dir}`);
    }

    files.splice(0,0,">>> None");
    let select = await input.select("please select a file",files);
    if(select === ">>> None"){
        return common.error("failed to select a file");
    } else {
        return `${dir}/${select}`;
    }

}

async function select_dir(base_dir,browser_tree){

    if(!browser_tree){browser_tree = [];}

    let curent_dir = base_dir;
    for(let item of browser_tree){
        curent_dir += `/${item}`;
    }

    let items = await get_dir_items(curent_dir);
    if(!items){
        return common.error("failed get dir items");
    }

    let options = [];
    if(browser_tree.length > 0){
        options.push("<<< back");
    }
    options.push(">>> select this dir");
    for(let h of items.dirs){options.push(h);}

    const select = await input.select("please select a dir",options);
    if(select === "<<< back"){
        if(browser_tree.length > 0){
            browser_tree.pop();
        }
    } else
    if(select === ">>> select this dir"){
        return curent_dir;
    } else {
        browser_tree.push(select);
    }

    return await select_dir(base_dir,browser_tree);

}

async function get_dir_items(path){
    const dir = await fs.opendir(path);
    if(!dir){
        return false;
    }
    let files = [];
    let dirs = [];
    for await (const item of dir){
        if(item.isFile()){
            files.push(item.name);
        } else {
            dirs.push(item.name);
        }
    }
    return {
        dirs:dirs,
        files:files
    };
}