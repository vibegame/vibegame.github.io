import React, {createRef, useCallback, useEffect, useRef} from 'react';
import * as PropTypes from 'prop-types';

import classNames from "classnames";

import ModalsStorage from "../ModalsStorage";
import Scatter from "../Scatter/Scatter";

import style from './Modal.pcss';


export const modalsStorage = new ModalsStorage();

const Modal = props => {

  const KEY = useRef();
  const refModal = createRef();

  const onClose = useCallback(() => {
    props.onClose && props.onClose();
  }, [props.onClose]);

  const onOpen = useCallback(() => {
    props.onOpen && props.onOpen();
  }, [props.onOpen]);

  const toggle = () => {
    props.isOpen ? onClose() : onOpen();
  };

  const onScatterClick = (target) => {
    const isModal = (refModal.current.contains(target) || refModal.current === target);

    if(!isModal) {
      props.onScatterClick && props.onScatterClick();
    }

  };

  const renderTrigger = () => {
    return (
        React.isValidElement(props.trigger) &&
          React.cloneElement(props.trigger, {
            onClick: event => {
              props.trigger.props.onClick && props.trigger.props.onClick(event);
              toggle();
            },
          })
    );
  };

  useEffect(() => {
    if(props.isOpen) {
      KEY.current = modalsStorage.createModal({
        open: onOpen,
        close: onClose
      }, props.token);
    }

    return () => {
      if(props.isOpen) {
        modalsStorage.deleteModal(KEY.current);
        KEY.current = null;
      }
    };

  }, [onClose, onOpen, props.token, props.isOpen]);

  return (
    <>
      {renderTrigger()}
      {
        props.isOpen &&
        (
          <Scatter onClick={onScatterClick}>
            <div
              className={classNames(style.modal, 'modal', props.className)}
              id={'Modal'}
              ref={refModal}
            >
              {props.children}
            </div>
          </Scatter>
        )
      }
    </>

  );


};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  trigger: PropTypes.node.isRequired,
  onScatterClick: PropTypes.func,
  className: PropTypes.string,
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

Modal.defaultProps = {

};


export default Modal;
