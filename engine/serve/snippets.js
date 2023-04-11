
const transform = require("./transform");

module.exports = {
    init:init,
    update_file:update_file
};

async function init(){
    const cwd = await io.dir.cwd();
    const app_dir = `${cwd}/app`;
    const snippets = await process_dir(app_dir);
    if(!await update_book(snippets)){
        return false;
    } else {return true;}
}

async function update_book(to_add){

    const cwd = await io.dir.cwd();
    const path = `${cwd}/snippets.json`;
    
    let book = {};
    if(await io.exists(path)){
        book = await io.readJson(path);
        if(!book){
            return common.error(`invalid snippets.json => ${path}`);
        }
    }

    for(let key in to_add){
        book[key] = to_add[key];
    }

    let as_str = JSON.stringify(book,null,2);
    if(!await io.write(path,as_str)){
        return common.error(`failed write snippets.json => ${path}`);
    }

    await transform.load();

    return common.tell("snippets.json updated");

}

async function process_dir(path){

    const items = await io.get_dir_items_raw(path);

    let files = [];
    let dirs = [];
    for(let item of items){
        if(item.isFile()){
            files.push(item.name);
        } else {
            dirs.push(item.name);
        }
    }

    let collect = {};
    for(let file of files){
        let file_path = `${path}/${file}`;
        let process = await process_file(file_path);
        if(!process){
            return common.error(`failed process file => ${file_path}`);
        } else {
            for(let key in process){
                if(collect.hasOwnProperty(key)){
                    return common.error(`duplicate snippet is found in file => ${file_path} snippet => ${key}`);
                } else {
                    collect[key] = process[key];
                }
            }
        }
    }

    for(let dir of dirs){
        let dir_path = `${path}/${dir}`;
        let process = await process_dir(dir_path);
        if(!process){
            return common.error(`failed process dir => ${dir_path}`);
        } else {
            for(let key in process){
                if(collect.hasOwnProperty(key)){
                    return common.error(`duplicate snippet is found in file => ${dir_path} snippet => ${key}`);
                } else {
                    collect[key] = process[key];
                }
            }
        }
    }

    return collect;

}

async function update_file(path){
    const snippets = await process_file(path);
    if(!await update_book(snippets)){
        return false;
    } else {return true;}
}

async function process_file(path){

    if(!path.includes("snippets.js")){
        return {};
    }

    let collect = {};
    let read = await io.read(path);
    let hold = read.split("//SNIPPET");
    for(var item of hold){
        item = item.trim();
        while(item.includes("\r\n")){
            item = item.replace("\r\n","\n");
        }
        if(item.length > 0){
            item = `//SNIPPET\n${item}`;
            // let regex = /(\/\/SNIPPET)[/\n\s]+(\/\/name=([\w.\-_+\d]+))[/\n\s]+([\S\s]+)/g;
            let regex = /(\/\/SNIPPET)[\n\s]+(\/\/name=([\w.\-_+\d]+))[\n\s]+([\S\s]+)/g;
            let match = regex.exec(item);
            if(match){
                collect[match[3]] = `//file=>${path}\n${match[4]}`;
            } else {
                return common.error(`snippet failed => \n\n${item}\n\n FILE => ${path}`);
            }
        }
    }

    return collect;

}