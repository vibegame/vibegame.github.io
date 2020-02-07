import React, {createRef, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import * as PropTypes from 'prop-types';

import classNames from 'classnames';

import ScatterStorage from "../ScatterStorage";

import style from './Scatter.pcss';


const scatterStorage = new ScatterStorage();

const Scatter = props => {

  const refContainer = createRef();
  const KEY = useRef();
  const [notEnoughSpace, setNotEnoughSpace] = useState(false);

  useLayoutEffect(() => {

    KEY.current = scatterStorage.addItem({
      item: null
    });

    return () => {
      scatterStorage.deleteItem(KEY.current);
    };
  }, []);

  const getHeightContainer = () => refContainer.current.offsetHeight;

  const getScrollHeightContainer = () => refContainer.current.scrollHeight;

  useEffect(() => {
    const heightContainer = getHeightContainer();
    const scrollHeightContainer = getScrollHeightContainer();

    if(scrollHeightContainer >= heightContainer) {
      setNotEnoughSpace(true);
    } else {
      setNotEnoughSpace(false);
    }

  }, [props.children, props.className]);

  const onMouseDown = useCallback((event) => {
    event.stopPropagation();
    props.onClick && props.onClick(event.target);
  }, [props.onClick]);

  return (
        <div
          className={classNames(style.container, notEnoughSpace && style.contentToTop, props.className)}
          onMouseDown={onMouseDown}
          ref={refContainer}
        >
          {props.children}
        </div>
  );

};

Scatter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default Scatter;
