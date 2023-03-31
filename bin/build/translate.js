const process = require("process");

// console.log(require("cluster"));

/*
//this object will be passed to translate function
//incoming message object
{
    text:'hello world',
    language:"HINDI"//this is provided in package.json under supported_languages key with value of an array ie supported_languages:["HINDI","FRENCH","GERMAN"]
}

//send this object on successfull translation
//outgoing/success message object
{
    text:'hello world',
    translation:'हैलो वर्ल्ड',
    language:"HINDI"
}
*/

//this function is called with a messgae
function translate(message){


    //please crash on error
    //return a success object on translation

    process.send({
        text:message.text,
        // translation:'हैलो वर्ल्ड',
        // translation:'akku',
        // translation:null,
        translation:`H.${message.text}.`,
        language:message.language
    });

}

//this receives a message form cli
process.on("message",(m)=>{
    translate(m);
});