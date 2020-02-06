import React from 'react';
import * as PropTypes from 'prop-types';

import classNames from "classnames";

import style from "../Modal.pcss";

const Actions = ({children, className}) => {
  return (
    <div className={classNames(style.actions, className, 'actions')}>
      {children}
    </div>
  );
};

Actions.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  isActions: PropTypes.bool
};

Actions.defaultProps = {
  isActions: true
};


export default Actions;
