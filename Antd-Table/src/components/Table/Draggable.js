import Subscribes from "./Subscribes";

export default class Draggable {
    draggable = {

    };

    droppable = {
        attributeValue: null,
        target: null
    };

    constructor(data) {
        this.onDragStart = this.onDragStart.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragOut = this.onDragOut.bind(this);
        this.onDrop = this.onDrop.bind(this);

        this.draggable.draggableAttribute = data.draggableAttribute;

        this.subscribes = new Subscribes();
    }

    onDragStart(event) {

        const target = event.currentTarget;
        const attributeValue = target.getAttribute(this.draggable.draggableAttribute);

        const {clientX: mouseX, clientY: mouseY} = event;

        const {left: offsetX, top: offsetY} = target.getBoundingClientRect();

        this.draggable = {
            ...this.draggable,
            target,
            attributeValue,
            offset: {
                x: offsetX,
                y: offsetY
            },
            clicked: {
                x: mouseX,
                y: mouseY
            }
        };

        this.subscribes.callSubscribe("dragstart", {
            draggable: this.draggable,
            event
        });

        console.log('%conDragStart', "color: #CDEB49;");
    };

    onDrag(event) {

        event.preventDefault();

        const newPosition = {
            left: event.clientX - this.draggable.clicked.x,
            top: 0
        };

        this.subscribes.callSubscribe("drag", {
            draggable: this.draggable,
            position: {...newPosition},
            event
        });

        const found = this._findDroppable({
            x: this.draggable.offset.x + newPosition.left + this.draggable.target.offsetWidth / 2,
            y: this.draggable.offset.y + newPosition.top + this.draggable.target.offsetHeight / 2,
        });

        if((found.attributeValue === null && this.droppable.attributeValue) || (found.attributeValue && this.droppable.attributeValue && found.key !== this.droppable.attributeValue)) {
            this._removeDroppable();
            this.onDragOut();
        }

        if(found.key && !(this.droppable && this.droppable.key === found.key)) {
            this._createDroppable(found);
            this.onDragEnter();
        }

    };

    onDragEnd() {
        if(this.droppable.key) {
            this.onDrop();
        }
        this.subscribes.callSubscribe("dragend", {
            draggable: this.draggable,
            droppable: this.droppable
        });
        console.log('%conDragEnd', "color: #57EB87;");
    };

    onDragEnter() {
        this.subscribes.callSubscribe("dragenter", {
            draggable: this.draggable,
            droppable: this.droppable
        });
        console.log('%conDragEnter', 'color: #6F83FF;');
    };

    onDragOut() {
        this.subscribes.callSubscribe("dragout", {
            draggable: this.draggable
        });
        console.log('%conDragOut', 'color: #805EEB;');
    };

    onDrop() {
        this.subscribes.callSubscribe("drop", {
            draggable: this.draggable,
            droppable: this.droppable
        });
        console.log('%conDrop', 'color: #FFA92E;');
    };

    _findDroppable = ({x, y}) => {

        this.draggable.target.style.visibility = 'hidden';
        const overElement = document.elementFromPoint(x, y);
        this.draggable.target.style.visibility = 'visible';

        return this._findByAttribute(overElement, this.draggable.draggableAttribute);
    };

    _findByAttribute = (element, attr) => {

        let usedElement = element;

        const result = {
            target: null,
            key: null
        };

        if (!(element instanceof HTMLElement)) return result;

        while (usedElement !== document.documentElement) {
            if (usedElement.hasAttribute[attr]) {
                result.target = usedElement;
                result.attributeValue = usedElement.getAttribute(attr);
                return result;
            }
            usedElement = usedElement.parentNode;
        }

        return result;
    };

    _createDroppable = (data) => {
        this.droppable = {
            target: data.target,
            attributeValue: data.attributeValue
        };
    };

    _removeDroppable = () => {
        this.droppable = {
            target: null,
            attributeValue: null
        };
    };
}