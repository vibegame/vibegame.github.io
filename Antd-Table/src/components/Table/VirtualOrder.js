class Order {

    constructor(elements) {

        this.elements = elements;

    }

    getObjectElements() {
        const oElements = {};

        this.elements.forEach((item, index) => {
            oElements[item] = index;
        });

    }


}