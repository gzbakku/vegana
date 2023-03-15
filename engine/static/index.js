

module.exports = {init:init};

async function init(api){

    if(!api){
        api = await input.select("please select a api",['collect',"run",'build']);
    }

    if(api === "collect"){
        require("./collect/index.js").init();
    } else
    if(api === "run"){
        require("./run/index.js").init();
    } else 
    if(api === "build"){
        require("./build/index.js").init();
    } else {
        return common.tell("this api is not implimented just yet.");
    }

}