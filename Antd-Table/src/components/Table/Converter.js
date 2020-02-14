class Converter {

    convertArrayToObjectByKey = (array, key) => {
        const object = {};
        array.forEach(element => {
            object[element[key]] = {...element};
            delete object[element[key]][key];
        });
        return object;
    };

    findElementByAttribute = (element, attribute) => {

        let usedElement = element;
        let result = null;
        if (!(element instanceof HTMLElement)) return result;

        while (usedElement !== document.documentElement) {
            if (usedElement.hasAttribute(attribute)) {
                result = usedElement;
                break;
            }
            usedElement = usedElement.parentNode;
        }

        return result;
    };

    convertArrayToObjectValuesByKey = (array, key) => {
        const object = {};

        array.forEach(element => {
            object[element.key] = element[key];
        });

        return object;
    };

    convertArrayToArrayValuesByKey = (array = [], key) => {
        return array.map((item) => item[key]);
    };

}

export default Converter;