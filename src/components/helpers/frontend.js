
export const limitText = (text,limit = 500) => {
    let newText = text;
    if(text && text.length >= limit){
        newText = text.substring(0,limit);
    }
    return newText;
}
export const remaingLimit = (text,limit = 500) => {
    let count = (limit - (text ? text.replace(/\r/g,'').length : 0));
    return count + ' characters left';
}
export const focusOnFeild = (name) => {
    if(document.getElementsByName(name)){
        let textbox = document.getElementsByName(name)[0];
        if(textbox){
            textbox.focus();
        }
    }
}
export const focusOnFeildUsingClassName = (name) => {
    if(document.getElementsByClassName(name)){
        let textbox = document.getElementsByClassName(name)[0];
        if(textbox){
            textbox.scrollIntoView();
        }
    }
}
export function hasValidationError(errors, field){
    if(errors.hasOwnProperty(field)){
        return errors[field] ? true : false;
    }
    return null;
}
export function validationError(errors,field,Name = null){
    if(errors.hasOwnProperty(field)){
        if(!Array.isArray(errors[field])){
            return errors[field];
        }else{
            return errors[field].toString();
        }
    }
    return null;
}

export const formatPhoneNumber = (phoneNumberString)  => {
    var cleaned = ('' +phoneNumberString).replace(/\D/g,'');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if(match){
    var intlCode = (match[1] ? '+1 ' : '');
        return [intlCode,'(',match[2],') ',match[3],'-',match[4]].join('');
    }
    return null;
}