import React, {createRef, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import * as PropTypes from 'prop-types';

import classNames from 'classnames';

import ScatterStorage from "../ScatterStorage";

import style from './Scatter.pcss';


const scatterStorage = new ScatterStorage();

const Scatter = props => {

  const refContainer = createRef();

  const KEY = useRef();

  useLayoutEffect(() => {

    KEY.current = scatterStorage.addItem({
      item: null
    });

    return () => {
      scatterStorage.deleteItem(KEY.current);
    };
  }, []);

  const onMouseDown = useCallback((event) => {
    event.stopPropagation();
    props.onClick && props.onClick(event.target);
  }, [props.onClick]);

  return (
        <div
          className={classNames(style.container, props.className)}
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
