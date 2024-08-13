import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
    static DEFAULT = 0;
    static JSON = 1;
    static save(key :string, value : any, type=Storage.DEFAULT){
        if(type == Storage.JSON){
            AsyncStorage.setItem(key, JSON.stringify(value));
        }
        else {
            AsyncStorage.setItem(key, value);
        }
    }

    static async get(key : string, type=Storage.DEFAULT){
        try {
            let data = await AsyncStorage.getItem(key) || undefined;
            if (data != undefined) {
                if(type == Storage.JSON){
                    return JSON.parse(data);
                }
                return data;
            }
            else{
                return undefined;
            }
        }
        catch (err){
            return undefined;
        }
    }

    static async clear(){
        await AsyncStorage.clear();
    }
}

export default Storage;