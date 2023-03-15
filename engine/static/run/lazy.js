

module.exports = {
    init:init,
};

async function init(){

    let paths = await get_module_paths();
    if(!paths){return false;}

    let compile = '';
    for(let path of paths){
        let read = await io.read(path);
        if(!read){
            return common.error(`failed read path => ${path}`);
        }
        compile += `\n\n${read}`;
    }

    compile = `

    window = new Proxy(window||{},{
        set:(obj,key,val)=>{
            // console.log({z:key});
            this[key] = val;
            obj[key] = this[key];
        }
    });

    ${compile}`;

    if(!await io.write("./js/static_bundle.js",compile)){
        return common.error("failed write static bundle");
    }

    return common.success("static bundle generated successfully");

}

async function get_module_paths(){

    common.tell("reading lazy.json");

    const lazy = await io.lazy.read();
    if(!lazy){
        return common.error("failed-read-lazy_json");
    }

    let js_dir = './js';
    let paths = [];
    function process_path(path){
        paths.push(`${js_dir}/${path}`);
    }

    process_path("vegana_static_builder.js");
    process_path("bundle.js");

    if(lazy.globals){
        for(let global of lazy.globals){
            process_path(`globals/${global}/globalComp.js`);
        }
    }

    if(lazy.pages){
        for(let page of lazy.pages){
            process_path(`pages/${page}/page.js`);
        }
    }

    if(lazy.conts){
        for(let page in lazy.conts){
            for(let cont of lazy.conts[page]){
                process_path(`pages/${page}/conts/${cont}/cont.js`);
            }
        }
    }

    if(lazy.panels){
        for(let page in lazy.panels){
            for(let cont in lazy.panels[page]){
                for(let panel of lazy.panels[page][cont]){
                    process_path(`pages/${page}/conts/${cont}/panels/${panel}/panel.js`);
                }
            }
        }
    }

    // console.log(paths);

    return paths;

}