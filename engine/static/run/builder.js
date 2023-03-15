
const serve_api = require("../../serve/index");

module.exports = {
    init:init
};

async function init(){

    common.tell("compiling static builder");

    let cwd = io.dir.cwd();
    let local = `${cwd}/${"static"}`;
    let in_mod = `${cwd}/${"node_modules/vegana-static"}`;

    let dir;
    if(await io.exists(local)){
        dir = local;
    } else if(await io.exists(in_mod)){
        dir = in_mod;
    }

    let from_path = `${dir}/builder/compiled.js`;
    let to_path = `${cwd}/js/vegana_static_builder.js`;

    if(!await serve_api.compiler.compile(
        from_path,to_path,false,false,false
    )){
        return common.error(`failed compile => ${from_path}`);
    }

    common.success("vegana static compiler built.");

    return true;

}