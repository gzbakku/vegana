
const serve_api = require("../../serve/index");
const builder = require("./builder");
const lazy = require("./lazy");

module.exports = {
    init:init,
    builder:builder,
    lazy:lazy,
    compile:compile,
};

async function init(){

    common.tell("running static");

    if(!await compile()){
        return false;
    }

    //generate server file
    const cwd = process.cwd();
    const path = `${cwd}/static_server_standalone.js`;
    require(path);


}

async function compile(){

global.VeganaBuildProduction = true;

    //compile all modules
    if(!await serve_api.compile.init()){
        return common.error("failed to compile static files");
    }

    //complie static builder
    if(!await builder.init()){
        return common.error("failed to compile static builder");
    }

    //compile all modules into one file
    if(!await lazy.init()){
        return common.error("failed to compile all modules into bundle");
    }

    return true;

}