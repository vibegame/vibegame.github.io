import Subscribes from "./Subscribes";

export default class Scalable {

    constructor({getWidth}) {
        this.onResizeStart = this.onResizeStart.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onResizeEnd = this.onResizeEnd.bind(this);

        this.getWidth = getWidth;
        this.subscribes = new Subscribes();
    }

    scalable = {
        target: null,
        startPointX: null,
        width: null
    };

    onResizeStart(event) {
        event.stopPropagation();

        const target = event.currentTarget;
        this.scalable.target = target;
        this.scalable.startPointX = event.clientX;
        this.scalable.width = this.getWidth && this.getWidth(event) || target.offsetWidth;

        this.subscribes.callSubscribe("onresizestart", {
            target: this.scalable.target,
            event
        });
    };

    onResize(event) {
        event.preventDefault();
        const mouseX = event.clientX;

        const columnWidth = this.scalable.width;
        const distance = mouseX - this.scalable.startPointX;

        this.subscribes.callSubscribe("onresize", {
            width: columnWidth + distance,
            target: this.scalable.target,
            event
        });
    };

    onResizeEnd(event) {
        this.subscribes.callSubscribe("onresizeend", {
            target: this.scalable.target,
            event
        });
    };
}