export type Validation = {
    isValid: boolean
    errorMessage: string   
}

const MAX_CHARACTERS_LENGTH = 20;

export const validateTextInput = (text: string | undefined, options?: {length: number}): Validation => {
    console.log('text:', text);
    
    if (!text) {
        return { isValid: false, 
            errorMessage: 'Value must not be empty!' };
    }  else if (text.length > (options?.length || MAX_CHARACTERS_LENGTH)) {
        return { isValid: false, errorMessage: `Value must not be longer than ${options?.length || MAX_CHARACTERS_LENGTH} characters` };
    }
    return { isValid: true, errorMessage: '' };
}

export const containsDuplicates = (array: any[], value: string) => {    
    return array.map(item => item.toLowerCase()).includes(value.toLowerCase());
}

export const validateUrlInput = (value: string) => {
    try {
        const newUrl = new URL(value);
        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
      } catch (err) {
        return false;
      }        
}

export const validateNumberInput = (i?: number) : Validation => {
    if (!i) {
        return { isValid: false, errorMessage: "Field does not exist!" }
    }
    
    if (i < 0) {
        return { isValid: false, errorMessage: "Input cannot be negative!" }
    } 
    
    if (i.toString().startsWith('0')) {
        return { isValid: false, errorMessage: "Input format is invalid!" }
    }

    return { isValid: true, errorMessage: '' }; 
}

export const validateEmailInput = () => {}