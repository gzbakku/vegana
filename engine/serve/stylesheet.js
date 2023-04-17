

module.exports = {
    init:init,
    compile:compile,
    copy_themes:copy_themes
};

async function init(){

    if(!await compile()){
        return common.error("failed compile stylesheet.json");
    }

    if(!await copy_themes()){
        return common.error("failed update themes");
    }

}

async function compile(){

    const cwd = await io.dir.cwd();
    const app_dir = `${cwd}/app`; 
    const ss_path = `${app_dir}/stylesheet.json`;
    if(!await io.exists(ss_path)){
        return common.error(`!!! not_found config => ${ss_path}`);
    }

    let read = await io.readJson(ss_path);
    if(!read){
        return common.error(`!!! failed config => ${ss_path}`);
    }

    let sass_variables = {};
    let css_variables = {};

    if(read.fonts instanceof Object){
        for(let font_name in read.fonts){
            let font = read.fonts[font_name];
            if(font.sass_var_name && font.css_var_name){
                sass_variables[font.sass_var_name] = font.css_var_name;
            }
            if(font.css_var_name && font.location){
                css_variables[font.css_var_name] = font_name;
            }
        }
    }
    if(read.colors instanceof Object){
        for(let color_name in read.colors){
            let color = read.colors[color_name];
            if(color.sass_var_name && color.css_var_name){
                sass_variables[color.sass_var_name] = color.css_var_name;
            }
            if(color.css_var_name && color.value){
                css_variables[color.css_var_name] = color.value;
            }
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
        css_variables_string += `${key}: ${css_variables[key]};`;
    }
    css_variables_string = `:root{\n${css_variables_string}\n}`;

    let sass_variables_string = '';
    for(let key in sass_variables){
        if(sass_variables_string.length > 0){sass_variables_string += '\n';}
        sass_variables_string += `$${key}: var(${sass_variables[key]});`;
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

    common.tell("sass variables updated from stylesheet");

    return await update_themes();

}

async function update_themes(){

    const cwd = await io.dir.cwd();
    const app_dir = `${cwd}/app`;
    const themes_dir = `${app_dir}/themes`;
    const ss_path = `${app_dir}/stylesheet.json`;

    let ss = await io.readJson(ss_path);
    if(!ss){
        return common.error(`failed read stylesheet.json at => ${ss_path}`);
    }

    if(!await io.dir.ensure(themes_dir)){
        return common.error(`failed ensure themes dir at => ${themes_dir}`);
    }

    let items = await dir.get_dir_items(themes_dir);
    if(!items){
        return common.error(`failed get themes dir files => ${themes_dir}`);
    }

    let themes_updated = false;
    for(let file of items.files){
        if(file.includes(".json")){
            let up = await update_theme(themes_dir,file,ss);
            if(!up){
                return common.error(`failed update_theme => ${file}`);
            }
            if(up === 1){
                themes_updated = true;
            }
        }
    }

    if(themes_updated){
        if(!await copy_themes()){
            return common.error("failed copy themes to js");
        }
    }

    return true;

}

async function update_theme(themes_dir,file_name,stylesheet){

    const path = `${themes_dir}/${file_name}`;

    let read = await io.read(path);
    if(typeof(read) !== 'string'){
        return common.error(`failed read theme file => ${themes_dir}`);
    }

    let parsed;
    if(read.length === 0){
        parsed = {};
    } else {
        try{
            parsed = JSON.parse(read);
        } catch(e){
            common.error("please fix the json or delete the entire content of the file to remake it from stylesheet");
            common.error(`theme is not a valid json object => ${path}`);
            return false;
        }
    }

    if(!parsed.fonts){parsed.fonts = {};}
    if(!parsed.colors){parsed.colors = {};}

    let updated = false;
    for(let key in stylesheet.fonts){
        if(!parsed.fonts.hasOwnProperty(key)){
            parsed.fonts[key] = stylesheet.fonts[key];
            if(!updated){updated = true;}
        }
    }
    for(let key in stylesheet.colors){
        if(!parsed.colors.hasOwnProperty(key)){
            parsed.colors[key] = stylesheet.colors[key];
            if(!updated){updated = true;}
        }
    }

    if(updated){
        if(!await io.write(path,JSON.stringify(parsed,null,2))){
            return common.error(`failed write updated theme to => ${path}`);
        }
        return 1;
    }

    return true;

}

async function copy_themes(){

    const cwd = await io.dir.cwd();
    const app_dir = `${cwd}/app`;
    const themes_from_dir = `${app_dir}/themes`;
    const themes_to_dir = `${cwd}/js/themes`;

    if(!await dir.remove_dir(themes_to_dir)){
        return common.error(`failed remove original dir => ${themes_to_dir}`);
    }

    if(!await io.copy(themes_from_dir,themes_to_dir)){
        return common.error(`failed copy themes dir from => ${themes_from_dir} to => ${themes_to_dir}`);
    }

    return common.tell("themes updated");

}