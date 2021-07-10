function modifyJson(json) {
    // Object.keys(json).forEach(function(key) {
    //     if()
    // })
    var modifiedJson = json;

    for (var element in json) {
        if (element.includes('@android:')) {
            Object.defineProperty(modifiedJson, element.replace('@android:', ''),
                Object.getOwnPropertyDescriptor(modifiedJson, element));
            delete modifiedJson[element];
        }
        if (typeof(json[element]) === 'object') {
            if (Array.isArray(json[element])) {
                for (var num in json[element]) {
                    modifiedJson[element][num] = modifyJson(json[element][num]);
                }
            } else {
                modifiedJson[element] = modifyJson(json[element]);
            }
            
        }
    }
    return modifiedJson;
}