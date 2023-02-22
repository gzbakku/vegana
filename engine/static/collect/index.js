const check_vegana_directory = require("../../../check_vegana_directory");

module.exports = {
    init:init
};

async function init(){

    common.tell("collecting all lazy modules to veganaStaticMap");

    if(!await check_vegana_directory.init()){
        return common.error("failed-collect-static");
    }

    common.tell("reading lazy.json");

    const lazy = await io.lazy.read();
    if(!lazy){
        return common.error("failed-read-lazy_json");
    }

    let builder = {
        pages:{},
        conts:{},
        panels:{},
        globals:{}
    };

    let sassPaths = {
        pages:{},
        conts:{},
        panels:{},
        globals:{},
        sassPack:{}
    };

    common.tell("collecting sassPacks");

    if(lazy.sass){
        for(let pack of lazy.sass){
            sassPaths.sassPack[pack] = "./css/sassPack/" + pack + "/pack.css";
        }
    }

    common.tell("collecting global comps");

    if(lazy.globals){
        for(let global of lazy.globals){
            builder.globals[global] = "require('./app/globals/" + global + "/globalComp.js')";
            sassPaths.pages[global] = "./css/globals/" + global + "/comp.css";
        }
    }

    common.tell("collecting pages");

    if(lazy.pages){
        for(let page of lazy.pages){
            builder.pages[page] = "require('./app/pages/" + page + "/page.js')";
            sassPaths.pages[page] = "./css/pages/" + page + "/page.css";
        }
    }

    common.tell("collecting conts");

    if(lazy.conts){
        for(let page in lazy.conts){
            builder.conts[page] = {};
            sassPaths.conts[page] = {};
            for(let cont of lazy.conts[page]){
                builder.conts[page][cont] = "require('./app/pages/" + page + "/conts/" + cont + "/cont.js')";
                sassPaths.conts[page][cont] = "./css/pages/" + page + "/conts/" + cont + "/cont.css";
            }
        }
    }

    common.tell("collecting panels");

    if(lazy.panels){
        for(let page in lazy.panels){
            builder.panels[page] = {};
            sassPaths.panels[page] = {};
            for(let cont in lazy.panels[page]){
                builder.panels[page][cont] = {};
                sassPaths.panels[page][cont] = {};
                for(let panel of lazy.panels[page][cont]){
                    builder.panels[page][cont][panel] = "require('./app/pages/" + page + "/conts/" + cont + "/panels/" + panel + "/panel.js')";
                    sassPaths.panels[page][cont][panel] = "./css/pages/" + page + "/conts/" + cont + "/panels/" + panel + "/panel.css";
                }
            }
        }
    }

    let combine = {
        modules:builder,
        sassPaths:sassPaths
    };

    common.tell("collecting all modules");

    let final = "module.exports = " + JSON.stringify(combine,null,2) + ";"

    common.tell("processing module collection");

    while(final.indexOf('"require(') >= 0){
        final = final.replace('"require(','require(');
    }
    while(final.indexOf(')"') >= 0){
        final = final.replace(')"',')');
    }

    // console.log(final);

    let path = await io.dir.cwd();
    path += "/veganaStaticMap.js";

    common.tell("writing veganaStaticMap");

    if(!await io.write(path,final)){
        return common.error("failed-write-map");
    }

    common.success("veganaStaticMap generated");

}