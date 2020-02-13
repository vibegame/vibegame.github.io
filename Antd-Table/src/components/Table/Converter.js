class Converter {

    convertArrayToObjectByProp = (array, prop) => {
        const object = {};
        array.forEach(element => {
            object[element[prop]] = {...element};
            delete object[element[prop]][prop];
        });
        return object;
    };

}

export default Converter;