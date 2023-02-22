const language = require("./language");

global.snippets = {};

module.exports = {
    file:file,
    all_files:all_files,
    process_dir:process_dir,
    load:load
};

async function all_files(){

    const cwd = await io.dir.cwd();
    const path = `${cwd}/app`;
    if(!process_dir(path)){
        return common.error("failed transform general js & json files in project.");
    }

}

async function process_dir(path){

    const items = await io.get_dir_items_raw(path);

    let files = [];
    let dirs = [];
    for(let item of items){
        if(item.isFile()){
            if(item.name.includes(".js") || item.name.includes(".json")){
                files.push(item.name);
            }
        } else {
            dirs.push(item.name);
        }
    }

    let collect = {};
    for(let file_name of files){
        let file_path = `${path}/${file_name}`;
        if(!await file(file_path)){
            return common.error(`failed to transform file => ${file_path}`);
        }
    }

    for(let dir of dirs){
        let dir_path = `${path}/${dir}`;
        if(!await process_dir(dir_path)){
            return common.error(`failed to transform file in directory => ${dir_path}`);
        }
    }

    return true;

}

async function file(path,do_translate){

    let read = await io.read(path);
    if(!read){
        return common.error(`failed read file for transform => ${path}`);
    }

    if(
        !read.includes("#SNIPPET") && 
        !read.includes("#UNIQID") &&
        !read.includes("#TS")
    ){
        if(do_translate){return await language.file(path);} 
        else {return true}
    }

    while(read.includes("\r\n")){
        read = read.replace("\r\n","\n");
    }

    let changed = false;
    let rebuild = '';
    for(let line of read.split("\n")){
        // console.log(line.includes("#TS"));
        let snippet_regex = /#SNIPPET=([\w\d.\-_+]+)/g;
        if(snippet_regex.test(line)){
            snippet_regex = /\/\/[\s]*#SNIPPET=([\w\d.\-_+]+)/g;
            let match = snippet_regex.exec(line);
            if(match){
                let name = match[1];
                if(!global.snippets.hasOwnProperty(name)){
                    common.error(`snippet not_found => ${name} => ${path}`);
                    // line += "\t#SNIPPET_NOT_FOUND";
                    rebuild += `//#SNIPPET=${name}\t#SNIPPET_NOT_FOUND\n`;
                    changed = true;
                } else {
                    common.tell(`snippet found => ${name}`);
                    rebuild += `\n//$SNIPPET=${name}\n${global.snippets[name]}\n`;
                    changed = true;
                }
            }
        } else if(line.includes("#UNIQID")){
            while(line.includes("#UNIQID")){
                line = line.replace("#UNIQID",uniqid());
            }
            rebuild += `${line}\n`;
            changed = true;
        } else if(line.includes("#TS")){
            console.log("trabnslate found");
            while(line.includes("#TS")){
                line = line.replace("#TS","$TS[]TS$");
            }
            console.log(line);
            rebuild += `${line}\n`;
            changed = true;
        } else {
            rebuild += `${line}\n`;
        }
    }

    while(rebuild[rebuild.length-1] === '\n'){
        rebuild = rebuild.slice(0,-1);
    }
    rebuild += '\n';

    if(!changed){
        if(do_translate){return await language.file(path);} 
        else {return true}
    }
    if(!await io.write(path,rebuild)){
        return common.error(`failed to update file after transform => ${path}`);
    } else {
        if(do_translate){return await language.file(path);} 
        else {return true}
    }

}

async function load(){

    const cwd = await io.dir.cwd();
    const path = `${cwd}/snippets.json`;
    if(!await io.exists(path)){
        if(!await io.write(path,"{}")){
            return common.error(`failed load snippets.json => ${path}`);
        }
    }

    let read = await io.readJson(path);
    if(!read){
        return common.error(`failed read snippets.json => ${path}`);
    } else {
        snippets = read;
        common.tell("snippets loaded");
    }

}