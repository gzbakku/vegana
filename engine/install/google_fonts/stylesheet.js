

module.exports = {
    init:init
};

async function init(font_file){

    let how_to_install = await get_var(
        null,
        null,
        "string",
        "create new font or set to existing font",
        ["new font","replace"]
    );
    if(!how_to_install){
        return common.error("failed to get instruction on how to install font in stylesheet");
    }

    let cwd = await io.dir.cwd();
    let ss_path = `${cwd}/app/stylesheet.json`;

    if(how_to_install === "new font"){
        if(!await new_font(font_file,ss_path)){
            return false;
        }
    }
    if(how_to_install === "replace"){
        if(!await replace_font(font_file,ss_path)){
            return false;
        }
    }

    return true;

}

async function new_font(font_file,ss_path){

    let css_var_name = await get_var(
        null,
        "--css-var-name",
        "string",
        "provide a css var name",
        null
    );
    if(!css_var_name){
        return common.error("failed to get css var name");
    }

    let sass_var_name = await get_var(
        null,
        "--sass-var-name",
        "string",
        "provide a sass var name",
        null
    );
    if(!sass_var_name){
        return common.error("failed to get sass var name");
    }

    let font_name = await get_var(
        null,
        "--new-font-name",
        "string",
        "provide a font name",
        null
    );
    if(!font_name){
        return common.error("failed to get font name");
    }

    let read = await io.readJson(ss_path);
    if(!read){
        return common.error(`failed read stylesheet.json at => ${ss_path}`);
    }

    read.fonts[font_name] = {
        location:font_file,
        css_var_name:css_var_name,
        sass_var_name:sass_var_name,
    };

    if(!await io.write(ss_path,JSON.stringify(read,null,2))){
        return common.error(`failed update stylesheet.json at => ${ss_path}`);
    }

    return true;

}

async function replace_font(font_file,ss_path){

    let read = await io.readJson(ss_path);
    if(!read){
        return common.error(`failed read stylesheet.json at => ${ss_path}`);
    }

    let installed_fonts = [];
    if(read.fonts instanceof Object){
        for(let font_name in read.fonts){
            installed_fonts.push(font_name);
        }
    }
    
    let install_to_font = await get_var(
        null,
        null,
        "string",
        "please select a font to install the file",
        installed_fonts
    );
    if(!install_to_font){
        return common.error("failed to select a font to install the file");
    }

    read.fonts[install_to_font].location = font_file;

    if(!await io.write(ss_path,JSON.stringify(read,null,2))){
        return common.error(`failed update stylesheet.json => ${ss_path}`);
    }

    return true;

}