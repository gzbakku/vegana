

module.exports = {
    init:init
};

async function init(enable_config_production){

    const cwd = await io.dir.cwd();
    const app_dir = `${cwd}/app`; 
    const config_path = `${app_dir}/config.json`;
    if(!await io.exists(config_path)){
        return common.error(`!!! not_found config => ${config_path}`);
    }

    let read = await io.readJson(config_path);
    if(!read){
        return common.error(`!!! failed config => ${config_path}`);
    }

    let sass_variables = {};
    let css_variables = {};

    if(read.layout instanceof Object){
        if(read.layout.fonts instanceof Array){
            for(let font of read.layout.fonts){
                if(font.sass_var_name && font.sass_var_value){
                    sass_variables[font.sass_var_name] = font.sass_var_value;
                }
                if(font.css_var_name && font.name){
                    css_variables[font.css_var_name] = font.name;
                }
            }
        }
        if(read.layout.colors instanceof Array){
            for(let color of read.layout.colors){
                if(color.sass_var_name && color.sass_var_value){
                    sass_variables[color.sass_var_name] = color.sass_var_value;
                }
                if(color.css_var_name && color.color){
                    css_variables[color.css_var_name] = color.color;
                }
            }
        }
    }

    let read_updated = false;
    if(!enable_config_production){
        if(read.production){read.production = false;read_updated = true;}
    }
    if(read_updated){
        if(!await io.write(config_path,JSON.stringify(read,null,2))){
            return common.error(`failed update config.json => ${config_path}`);
        }
    }

    const sass_path = `${cwd}/sass/sass_variables.scss`;
    let sass = await io.read(sass_path);
    if(!sass){
        return common.error(`failed read sass variables file => ${sass_path}`);
    }

    let border;
    let borders = [
        '//----------------------------------\n//auto generated variables ends here\n//----------------------------------\n',
        '//----------------------------------\r\n//auto generated variables ends here\r\n//----------------------------------\r\n',
        '//----------------------------------\r//auto generated variables ends here\r//----------------------------------\r'
    ];

    let not_found = true;
    for(let item of borders){
        if(sass.includes(item)){not_found = false;border = item;}
    }
                     
    if(not_found){
        common.tell(`please add the following to the sass varibales file at => ${sass_path}\n`);
        for(let item of borders){   
            // console.log(`\n\n${borders}\n`);
            console.log(`${item}`);
        }
        // console.log(`\n\n${borders}\n`);
        return common.error("\nborder tag for auto generated variables not found.");
    }

    let hold = sass.split(border);

    let css_variables_string = '';
    for(let key in css_variables){
        if(css_variables_string.length > 0){css_variables_string += '\n';}
        css_variables_string += `--${key}: ${css_variables[key]};`;
    }
    css_variables_string = `:root{\n${css_variables_string}\n}`;

    let sass_variables_string = '';
    for(let key in sass_variables){
        if(sass_variables_string.length > 0){sass_variables_string += '\n';}
        sass_variables_string += `$${key}: ${sass_variables[key]};`;
    }

    let combined = `\n${css_variables_string}\n\n${sass_variables_string}\n\n${border}`;
    if(
        hold[1][0] !== "\n" &&
        hold[1][0] !== "\r\n" &&
        hold[1][0] !== "\r"
    ){combined += '\n';}
    combined += hold[1];

    if(!await io.write(sass_path,combined)){
        return common.error(`failed update sass variables files with updated variables => ${sass_path}`);
    }

    common.tell("sass variables updated from config");

    return true;

}