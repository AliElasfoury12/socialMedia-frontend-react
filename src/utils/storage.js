import { isObject } from "./objects";

class Storage {

    save (key, value) {
        if(isObject(value))
            localStorage.setItem(key, JSON.stringify(value))
        else
            localStorage.setItem(key, value)
           
    }

    get (key) {
        const value = localStorage.getItem(key)
        if(!value) return '';

        try {
            return JSON.parse(value); 
        } catch (error) {
            return value
        }
    }

    delete ($key) {
        localStorage.removeItem($key)
    }
}

export const storage = new Storage