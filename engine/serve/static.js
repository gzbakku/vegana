

module.exports = {
    init:init,
    verify:verify
};

async function verify(){

    const cwd = await io.dir.cwd();
    const app_dir = await io.dir.app();

    const files = [
        {from:'config.json',to:'static_server_config.json'},
        {from:'dev.js',to:'static_server_standalone.js'},
        {from:'dev_cli.js',to:'static_server.js'}
    ];

    for(let file of files){
        let app_path = `${cwd}/${file.to}`;
        if(!await io.exists(app_path)){
            let bin_path = `${app_dir}/static/${file.from}`;
            if(!await io.copy(bin_path,app_path)){
                return common.error(`failed generate static file => ${app_path}`);
            }
        }
    }

    common.tell("static files checked successfully");

    return true;

}

async function init(){

    const cwd = await io.dir.cwd();
    const app_dir = await io.dir.app();
    const config_path = `${cwd}/static_server_config.json`;
    if(!await io.exists(config_path)){
        return common.error(`failed static config || not found => ${config_path}`);
    }

    let read = await io.readJson(config_path);
    if(!read){
        return common.error(`!!! failed config => ${config_path}`);
    }

    read.lastModified = common.time();

    if(!await io.write(config_path,JSON.stringify(read,null,2))){
        return common.error(`failed update config file => ${config_path}`);
    }

    common.tell("static config updated successfully");

    return true;

}