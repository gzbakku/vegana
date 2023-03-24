const make = require("./make");
const copy = require("./copy");
const runner = require("../run/index");

module.exports = {
    init:init
};

async function init(){

    if(true && !await runner.compile()){
        return false;
    }

    if(true && !await copy.make_directories()){
        return false;
    }

    if(true && !await copy.files()){
        return false;
    }

    if(true && !await make.init()){
        return false;
    }

    common.tell("you can access static build at ./build/static");
    common.tell("static server can be started by command : 'node index'");

    return common.success("static built successfully");

}