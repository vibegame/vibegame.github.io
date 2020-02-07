import React from 'react';
import * as PropTypes from 'prop-types';

import classNames from "classnames";

import style from "../OLD/Modal.pcss";


const Header = ({children, className}) => {
  return (
    <div className={classNames(style.header, className)}>
      {children}
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
};

export default Header;
