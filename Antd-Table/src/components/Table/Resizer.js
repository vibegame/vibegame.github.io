import React, {useState} from 'react';

class WidthResizer {

    startX = null;
    width = null;
    maxWidth = null;
    minWidth = null;

    constructor({width, maxWidth, minWidth}) {
        this.maxWidth = maxWidth;
        this.minWidth = minWidth;
        this._setWidth(width);
    }

    setStartingPoint = ({x}) => {
        this.startX = x;
    };

    resize = ({x}) => {
        const width = x - this.startX;
        this._setWidth(width);
    };

    _setWidth = width => {
        this.width = this._getWidthByRange(width);
    };

    _getWidthByRange = (width) => {
        let widthByRange = width;

        if(width >= this.maxWidth) {
            widthByRange = this.maxWidth;
        } else if(width <= this.minWidth) {
            widthByRange = this.minWidth;
        }

        return widthByRange;
    };

}

export default WidthResizer;