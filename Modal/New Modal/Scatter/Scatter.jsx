import React, {createRef, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';

import * as PropTypes from 'prop-types';

import classNames from 'classnames';

import Storage from "../Storage";

import style from './Scatter.pcss';

const scatterStorage = new Storage();

const Scatter = props => {

  const refContainer = createRef();
  const KEY = useRef();
  const [notEnoughSpace, setNotEnoughSpace] = useState(false);

  useLayoutEffect(() => {

    if(scatterStorage.getCount() === 0) {
      document.body.style.overflow = 'hidden';
    }

    KEY.current = scatterStorage.addItem(null);

    return () => {
      if(scatterStorage.getCount() === 1) {
        document.body.style.overflow = '';
      }

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

  const onClick = useCallback((event) => {
    console.log(event.target, KEY.current);
    props.onClick && props.onClick(event.target);
  }, [props.onClick]);

  return (
        <div
          className={classNames(style.container, notEnoughSpace && style.contentToTop, props.className)}
          style={{
            zIndex: props.zIndex
          }}
          onClick={onClick}
          ref={refContainer}
        >
          {props.children}
        </div>
  );

};

Scatter.propTypes = {
  zIndex: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  onClick: PropTypes.func,
  className: PropTypes.string
};
Scatter.defaultProps = {
  zIndex: 1
};

export default Scatter;
