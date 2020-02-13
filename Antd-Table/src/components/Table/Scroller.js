import React, {useMemo, useState} from 'react';

class Scroller {

    scrollTop = 0;
    scrollLeft = 0;

    onScroll = event => {
        this.scrollTop = event.currentTarget.scrollTop;
        this.scrollLeft = event.currentTarget.scrollLeft;
    };

}

const useScroll = () => {

    const scrollManager = useMemo(() => new Scroller(), []);
    const [scrollData, setScrollData] = useState({
        top: scrollManager.scrollTop,
        left: scrollManager.scrollLeft
    });

    const onScroll = (event) => {
        scrollManager.onScroll(event);
        setScrollData(
            {
                top: scrollManager.scrollTop,
                left: scrollManager.scrollLeft
            }
        );
    };

    return {onScroll, scrollData};
};


export {useScroll};