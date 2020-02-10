import React, {useEffect, useRef, useCallback,createRef, useState} from 'react';
import * as PropTypes from 'prop-types';

import classNames from 'classnames';

import Header from './Additional/Header';
import Content from './Additional/Content';
import Actions from './Additional/Actions';

import Modal, {modalsStorage} from "./Modal/Modal";

import style from './ModalWrapper.pcss';
import {generateUKey} from "./Storage";

const ModalWrapper = function (props) {

  const token = useRef(props.token || generateUKey());
  const UPDATE_HEIGHT_TIMER = useRef();
  const refModal = createRef();
  const modalHeight = useRef();
  const [enoughSpace, setEnoughSpace] = useState(true);


  const onScatterClick = () => {
    if(props.needCloseOnScatterClick && props.needCloseOnScatterClick) {
      modalsStorage.close(token.current);
    }
  };

  const onEscapePress = () => {
    const openedModals = modalsStorage.openedModals;
    openedModals[openedModals.length - 1].close();
  };

  const onKeyDown = useCallback((event) => {
    const ESCAPE_CODE = 27;

    if(event.keyCode === ESCAPE_CODE && props.needCloseOnEscape) {
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

  const updateContainer = () => {
    const node = refModal.current;

    const parentScrollHeight = node.parentNode.scrollHeight;
    const parentHeight = node.parentNode.offsetHeight;

    setEnoughSpace(parentHeight >= parentScrollHeight);
  };

  useEffect(
    function mountEffect() {
      const UPDATE_TIME = 20;
      UPDATE_HEIGHT_TIMER.current = setInterval(() => {
        if(refModal.current && refModal.current.offsetHeight !== modalHeight.current) {
          modalHeight.current = refModal.current.offsetHeight;
          updateContainer();
        }
    }, UPDATE_TIME);

    return (
        function unmountEffect() {
          clearInterval(UPDATE_HEIGHT_TIMER.current)
        }
    );
  });

  return (
        <Modal
          {...props}
          onScatterClick={onScatterClick}
          modalClassName={classNames(style.modal, props.className)}
          scatterClassName={classNames(!enoughSpace && style.contentToTop, props.scatterClassName)}
          token={token.current}
          ref={refModal}
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
  needCloseOnEscape: PropTypes.bool,
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

ModalWrapper.defaultProps = {
  needCloseOnScatterClick: true,
  needCloseOnEscape: true,
};

ModalWrapper.Actions = Actions;
ModalWrapper.Content = Content;
ModalWrapper.Header = Header;

export default ModalWrapper;
