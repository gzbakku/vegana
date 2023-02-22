const { fork } = require('node:child_process');

module.exports = {
    all_files:all_files,
    process_dir:process_dir,
    file:file
};

async function all_files(path){

    const cwd = await io.dir.cwd();
    const app_dir = `${cwd}/app`; 
    if(!process_dir(path)){
        return common.error("failed translate general js & json files in project.");
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
            return common.error(`failed to translate file => ${file_path}`);
        }
    }

    for(let dir of dirs){
        let dir_path = `${path}/${dir}`;
        if(!await process_dir(dir_path)){
            return common.error(`failed to translate file in directory => ${dir_path}`);
        }
    }

    return true;

}

async function file(path){

    if(!await ensure_translator()){
        return false;
    }

    let read = await io.read(path);
    if(!read){
        return common.error(`failed read file for translate => ${path}`);
    }
    if(!read.includes("$TS[")){
        return true;
    }

    let started = false;
    let index = 0;
    let collect = [];
    let build = '';
    for(let i=0;i<read.length;i++){

        let char = read[i];
        if(started && char !== "]"){
            build += char;
        }

        if(char === "$" && !started){
            if(
                read[i+1] === 'T' && 
                read[i+2] === 'S' && 
                read[i+3] === '['
            ){
                started = true;
                i += 3;
            }
        }

        if(started && char === "]"){
            if(
                read[i+1] === 'T' && 
                read[i+2] === 'S' && 
                read[i+3] === '$'
            ){
                started = false;
                collect.push(build);
                i += 3;
                build = '';
            }
        }

        index++;

    }

    return await add_to_dict_locked(collect);

}

let translations_lock = [];
async function add_to_dict_locked(data,inner){
    return new Promise((resolve)=>{
        let build = {
            resolve:resolve,
            data:data
        };
        translations_lock.push(build);
    })
    .then(()=>{
        return true;
    })
    .catch(()=>{
        return false;
    });
}

async function add_to_dict_lock_loop(){
    if(translations_lock.length === 0){
        setTimeout(()=>{
            add_to_dict_lock_loop();
        },100);
        return;
    }
    let item = translations_lock.shift();
    const run = add_to_dict(item.data);
    item.resolve(run);
    add_to_dict_lock_loop();
}

add_to_dict_lock_loop();

//data is a array vector of strings
async function add_to_dict(data){

    const cwd = await io.dir.cwd();
    const path = `${cwd}/translations.json`;

    let read = {};
    if(await io.exists(path)){
        read = await io.readJson(path);
        if(!read){
            return common.error("failed read translations.json");
        }
    }

    const langs = await get_languages();
    if(!langs){return false;}
    const primary_languages = langs.primary;
    const built_languages = langs.built;

    let updated = false;
    for(let text of data){
        if(!read.hasOwnProperty(text)){
            updated = true;
            read[text] = {};
        } else {
            for(let key in read[text]){
                if(read[text][key] !== true){
                    updated = true;
                }
            }
        }
    }

    if(!updated){
        for(let key in read){
            for(let lang of primary_languages){
                if(
                    built_languages.indexOf(lang) < 0 ||
                    !read[key].hasOwnProperty(lang)
                ){
                    updated = true;
                    break;
                } else {
                    if(read[key][lang] !== true){
                        updated = true;
                        break;
                    }
                }
            }
        }
    }

    if(!updated){return true;}

    common.tell("translations updated");

    if(!await io.write(path,JSON.stringify(read,null,2))){
        return common.error(`failed write translations.json => ${path}`);
    }

    return await update_translations();

}

async function update_translations(){

    console.log("update_translations");

    //read translation
    const cwd = await io.dir.cwd();
    const path = `${cwd}/translations.json`;
    if(!await io.exists(path)){
        return common.error(`not_found translations.json => ${path}`);
    }
    const read = await io.readJson(path);
    if(!read){
        return common.error(`failed read translations.json => ${path}`);
    }

    const langs = await get_languages();
    if(!langs){return false;}
    const primary_languages = langs.primary;
    const built_languages = langs.built;

    //promisify translate
    let promises = [];
    function p(t,l){
        promises.push(translate({
            text:t,
            language:l
        }));
    }
    for(let key in read){
        for(let language of primary_languages){
            if(!read[key].hasOwnProperty(language) || built_languages.indexOf(language) < 0){
                p(key,language);
            } else if(read[key][language] !== true){
                p(key,language);
            }
        }
    }

    const all = await Promise.all(promises)
    .then((results)=>{
        return results;
    })
    .catch((errors)=>{
        return false;
    });
    if(!all){
        return common.error("failed translate with translate.js");
    }

    // console.log({all:all});

    let updates = {};
    for(let item of all){
        if(!updates.hasOwnProperty(item.language)){
            updates[item.language] = [];
        }
        if(typeof(item.translation) === 'string'){
            updates[item.language].push(item);
            read[item.text][item.language] = true;
        } else {
            read[item.text][item.language] = false;
        }
    }

    let some_failed = false;
    for(let key in updates){
        if(!await update_language(key,updates[key])){
            console.log("!!! failed update_language");
            for(let item of updates){
                read[item.text][item.language] = false;
            }
            common.error(`failed-update_translation => lang => ${key}`);
            some_failed = true;
        }
    }

    if(!some_failed){
        common.success("all language translations successfull");
    }

    if(!await io.write(path,JSON.stringify(read,null,2))){
        common.error(`failed to update translations.json => ${path}`);
    }

}



async function update_language(name,data){

    // console.log("update_language");
    // console.log(data);

    const cwd = await io.dir.cwd();
    const dir = `${cwd}/js/languages`;
    await io.dir.ensure(dir);
    const path = `${dir}/${name}.json`;

    let read = {};
    if(await io.exists(path)){
        read = await io.readJson(path);
    }
    if(!read){
        return common.error(`failed read language pack json => ${name} => ${path} , make sure this file is a valid json object if not delete it and try again.`);
    }

    // console.log(data);

    for(let item of data){
        if(item.translation){
            read[item.text] = item.translation;
        }
    }

    if(!await io.write(path,JSON.stringify(read,null,2))){
        return common.success(`failed update language pack => ${name} ${path}`);
    }

    return common.success(`${name} language pack updated successfully`);

    // return true;

}

async function get_languages(){

    const cwd = await io.dir.cwd();

    //find languages
    const languages_dir = `${cwd}/js/languages`;
    let languages = await io.get_dir_files(languages_dir);
    let collect = [];
    for(let item of languages){
        collect.push(item.replace(".json",""));
    }
    languages = collect;

    //read languages form package
    const info_path = `${cwd}/package.json`;
    if(!await io.exists(info_path)){
        return common.error(`not_found package.json => ${info_path}`);
    }
    const package = await io.readJson(info_path);
    if(!package){
        return common.error(`failed read package.json => ${info_path}`);
    }
    if(!(package.languages instanceof Array)){
        return common.error(`please add a json property of languages with a value of a stinrg of arrays of languages that you wnat to translate. => ${info_path}`);
    }

    return {
        built:languages,
        primary:package.languages
    };

}

/*
//valid object to be placed in to_translate
{
    promise:{
        resolve:resolve,
        reject:reject,
    },
    data:{
        text:"lorem ipsum",
        language:"HINDI"
    }
}
*/
let to_translate = [];
let translator_book = {};
async function translate(data){
    return new Promise((resolve,reject)=>{
        to_translate.push({
            promise:{
                resolve:resolve,
                reject:reject,
            },
            data:data
        });
    })
    .then((m)=>{
        return m;
    }).catch(()=>{
        data.translation = null;
        return data;
    });
}

async function translation_loop(){

    if(to_translate.length === 0){
        setTimeout(()=>{
            translation_loop();
        },100);
        return;
    }

    let hold;
    const threashold = 1;
    if(to_translate.length > threashold){
        hold = to_translate.splice(0,threashold);
    } else {
        hold = Object.assign([],to_translate);
        to_translate = [];
    }
    
    const cwd = await io.dir.cwd();
    const path = `${cwd}/translate.js`;

    // if(get_variable("translate-debug")){
    //     if(!global.translateModule){
    //         global.translateModule = require(path);
    //     }
    // }

    // if(!global.translateModule){
    //     global.translateModule = require(path);
    // }

    // return;
    let controller = new AbortController();
    let signal = controller.signal;
    let child = fork(path,["child"],{signal:signal});
    
    for(let item of hold){
        translator_book[item.data.text] = item.promise;
        child.send(item.data);
    }

    function kill(){
        controller.abort();
    }

    child.on("message",(msg)=>{
        if(typeof(msg) === "object"){
            if(
                msg.hasOwnProperty("translation") && 
                typeof(msg.text) === 'string' &&
                typeof(msg.language) === 'string'
            ){
                if(translator_book.hasOwnProperty(msg.text)){
                    if(typeof(msg.translation) === 'string'){
                        translator_book[msg.text].resolve(msg);
                        delete translator_book[msg.text];
                        check_exit();
                    } else {
                        translator_book[msg.text].reject();
                        delete translator_book[msg.text];
                        check_exit();
                    }
                } else {
                    common.error("translate.js-invalid_message-invalid_identifier-1");
                    kill();
                }
            } else if(typeof(msg.text) === 'string') {
                if(translator_book.hasOwnProperty(msg.text)){
                    translator_book[msg.text].reject();
                    delete translator_book[msg.text];
                    check_exit();
                } else {
                    common.error("translate.js-invalid_message-invalid_identifier-2");
                    kill();
                }
            } else {
                common.error("translate.js-invalid_message-object_properties-3");
                kill();
            }
        } else {
            common.error("translate.js-invalid_message-object_type-4");
            kill();
        }
        
    });

    function check_exit(){
        if(Object.keys(translator_book).length === 0){
            restart();
        }
    }

    function restart(){
        setTimeout(()=>{
            translation_loop();
        },100);
    }

    function reject_all(){
        common.error("translate.js-reject_all");
        for(let key in translator_book){
            translator_book[key].reject();
        }
        translator_book = {};
        restart();
    }

    let rejected = false;
    child.on("error",()=>{
        if(rejected){return;} else {rejected = true;}
        common.error("translate.js-procss_killed");
        reject_all();
    });

    child.on("exit",()=>{
        if(Object.keys(translator_book).length > 0){
            reject_all();
        } else {
            restart();
        }
    });

}

setTimeout(()=>{
    translation_loop();
},1000);

async function ensure_translator(){

    const cwd = await io.dir.cwd();
    const path = `${cwd}/translate.js`;
    
    if(!await io.exists(path)){
        const bin_path = await io.dir.app();
        const form_path = `${bin_path}/generate/translate.js`;
        const to_path = path;
        if(!await io.copy(form_path,to_path)){
            return common.error("failed-generate-translator.js");
        }
        common.success("translate.js file created in root directory use this file to translate you primary strings into provided languages");
    }

    return true;

}

