

module.exports = {init:init};

async function init(api){

    if(!api){
        api = await input.select("please select a api",['collect','config','start']);
    }

    if(api === "collect"){
        require("./collect/index.js").init();
    } else {
        return common.tell("this api is not implimented just yet.");
    }

}