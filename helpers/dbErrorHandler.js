"use strict"

//get unique error field name 

const uniqueMessage = error =>{
    let output;
    try{
        let fieldName = error.message.substring(
            error.message.lastIndexOf(".$") + 2,
            error.message.lastIndexOf("_1")
        );
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + "already exist";
    }
    catch{
        output= "unique field already exist";
    }
    return output;
} 

// get the error msg

exports.errorHandler = error =>{
    let message = "";
    if(error.code){
        switch(error.code){
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
            default:
                message ="something went wrong";
        }
    }else {
        for (let errorName in error.errors){
            if(error.errors[errorName].message)
            message = error.errors[errorName].message;
        }
    }
    return message;
}
