import React, {useCallback, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

import classNames from "classnames";

import ModalsStorage from "../ModalsStorage";
import Scatter from "../Scatter/Scatter";

export const modalsStorage = new ModalsStorage();

const Modal = React.forwardRef((props, refModal) => {

    const KEY = useRef();

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

        if (!isModal) {
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
        KEY.current = modalsStorage.addItem({
            key: props.token
        });

        return () => {
            modalsStorage.deleteItem(KEY.current);
        };
    }, [props.token]);

    useEffect(() => {

        modalsStorage.updateItem({
            key: KEY.current,
            item: {
                open: onOpen,
                close: onClose,
                isOpen: props.isOpen
            }
        });

    }, [onClose, onOpen, props.isOpen]);

    return (
        <>
            {renderTrigger()}
            {
                props.isOpen &&
                (
                    ReactDOM.createPortal((
                        <Scatter onClick={onScatterClick} className={props.scatterClassName}>
                            <div
                                className={classNames('modal', props.modalClassName)}
                                id={'Modal'}
                                ref={refModal}
                            >
                                {props.children}
                            </div>
                        </Scatter>
                    ), document.body)
                )
            }
        </>

    );

});

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    onClose: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
    trigger: PropTypes.node.isRequired,
    onScatterClick: PropTypes.func,
    scatterClassName: PropTypes.string,
    modalClassName: PropTypes.string,
    token: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

Modal.defaultProps = {};


export default Modal;
