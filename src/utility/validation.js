const validator = (value, rules) => {
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case 'isName':
                isValid = isValid && nameValidator(value);
                break;
            case 'isEmail':
                isValid = isValid && emailValidator(value);
                break;
            case 'minLength':
                isValid = isValid && passwordValidator(value, rules[rule]);
                break;
            default:
                isValid = true;
        }
    }
    return isValid
};

const nameValidator = (value) => {
    return /^[a-zA-Z ]$/.test(value);

};

const emailValidator = (value) => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value);
};

const passwordValidator = (value, minLength) => {
    return value.length >= minLength;
};

export default validator