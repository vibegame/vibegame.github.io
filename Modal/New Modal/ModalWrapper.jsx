import React, {useEffect} from 'react';
import * as PropTypes from 'prop-types';

import classNames from 'classnames';

import Header from '../Header/Header';
import Content from '../Content/Content';
import Actions from '../Actions/Actions';

import Modal, {modalsStorage} from "./Modal/Modal";

import style from './ModalWrapper.pcss';
import {generateUKey} from "./Storage";

const ModalWrapper = function (props) {

  const onScatterClick = () => {
    return;
    if(props.needCloseOnScatterClick) {
      modalsStorage.getModal(props.token).close();
    }
  };

  return (
        <Modal
          {...props}
          onScatterClick={onScatterClick}
          className={classNames(style.modal, props.className)}
          token={props.token}
        />
  )
};

ModalWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  trigger: PropTypes.node.isRequired,
  onScatterClick: PropTypes.func,
  className: PropTypes.string,
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  needCloseOnScatterClick: PropTypes.bool,
  needCloseOnEscape: PropTypes.bool
};

ModalWrapper.defaultProps = {
  needCloseOnScatterClick: true,
  needCloseOnEscape: true,
  token: generateUKey()
};

ModalWrapper.Actions = Actions;
ModalWrapper.Content = Content;
ModalWrapper.Header = Header;

export default ModalWrapper;
