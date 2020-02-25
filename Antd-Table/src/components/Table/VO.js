export default class VirtualOrder {

    constructor(realOrder) {
        this.realOrder = realOrder ? [...realOrder] : [];
        this.virtualOrder = [...this.realOrder];
        this.diffs = this.realOrder.map(() => 0);
    }

    indexToIndex = (from, to) => {

        const fromIndex = this.virtualOrder.indexOf(from);
        const toIndex = this.virtualOrder.indexOf(to);

        let subMovementElements = [];

        if(toIndex > fromIndex) {
            // left
            subMovementElements = this.virtualOrder.slice(fromIndex, toIndex + 1);
            this.shiftLeft(subMovementElements);
            this.virtualOrder.splice(fromIndex, toIndex - fromIndex + 1, ...subMovementElements);
        }

        if(toIndex < fromIndex) {
            // right
            subMovementElements = this.virtualOrder.slice(toIndex, fromIndex + 1);
            this.shiftRight(subMovementElements);
            this.virtualOrder.splice(toIndex, fromIndex - toIndex + 1, ...subMovementElements);
        }

        return this.diffsFromRealOrder();

    };

    shiftLeft = arr => {

        const buf = [...arr];

        for(let i=0;i<arr.length;i++) {
            arr[i] = buf[(i+1)%arr.length]
        }

    };

    shiftRight = arr => {

        const buf = [...arr];

        for(let i=0;i<arr.length;i++) {
            arr[(i+1)%arr.length] = buf[i];
        }

    };

    diffsFromRealOrder = () => {

        for(let i = 0; i < this.realOrder.length; i++) {
            const key = this.realOrder[i];
            const index = this.virtualOrder.indexOf(key);
            if(index < i) {
                this.diffs[i] = index - i;
            }
            else if(index > i) {
                this.diffs[i] = index - i;
            } else {
                this.diffs[i] = 0;
            }
        }

        return this.diffs;
    };

}
