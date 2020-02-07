import React from 'react';
import * as PropTypes from 'prop-types';

import classNames from "classnames";

import style from "../OLD/Modal.pcss";


const Content = ({children, className}) => {
  return (
    <div className={classNames(style.content, className, 'content')}>
      {children}
    </div>
  );
};

Content.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

export default Content;
