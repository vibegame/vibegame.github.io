import React, {useEffect, useRef, useCallback} from 'react';
import * as PropTypes from 'prop-types';

import classNames from 'classnames';

import Header from './Additional/Header';
import Content from './Additional/Content';
import Actions from './Additional/Actions';

import Modal, {modalsStorage} from "./Modal/Modal";

import style from './ModalWrapper.pcss';
import {generateUKey} from "./Storage";

const ModalWrapper = function (props) {

  const token = useRef(generateUKey());

  const onScatterClick = () => {
    if(props.needCloseOnScatterClick) {
      modalsStorage.close(token.current);
    }
  };

  const onEscapePress = () => {
    const openedModals = modalsStorage.openedModals;
    openedModals[openedModals.length - 1].close();
  };

  const onKeyDown = useCallback((event) => {
    const ESCAPE_CODE = 27;

    if(event.keyCode === ESCAPE_CODE) {
      onEscapePress();
    }
  }, [props.needCloseOnEscape]);

  useEffect(() => {
    if(props.isOpen) {
      const openedModals = modalsStorage.openedModals;
      if(openedModals.length === 1) {
        window.addEventListener('keydown', onKeyDown);
      }
    }

    return () => {
      if(props.isOpen) {
        window.removeEventListener('keydown', onKeyDown);
      }
    };
  }, [props.isOpen]);

  return (
        <Modal
          {...props}
          onScatterClick={onScatterClick}
          modalClassName={classNames(style.modal, props.className)}
          scatterClassName={props.scatterClassName}
          token={token.current}
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
  needCloseOnScatterClick: PropTypes.bool,
  needCloseOnEscape: PropTypes.bool
};

ModalWrapper.defaultProps = {
  needCloseOnScatterClick: true,
  needCloseOnEscape: true,
};

ModalWrapper.Actions = Actions;
ModalWrapper.Content = Content;
ModalWrapper.Header = Header;

export default ModalWrapper;
