import React, {Fragment, createRef} from 'react';
import ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

import classNames from 'classnames';

import Dimmer from '../../Dimmer/Dimmer';

import Header from "./Header/Header";
import Content from "./Content/Content";
import Actions from "./Actions/Actions";


import style from './Modal.pcss';

const modalsStore = [];

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    dimmerClassName: PropTypes.string,
    needDimmer: PropTypes.bool,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    onUnmount: PropTypes.func,
    onMount: PropTypes.func,
    closeIcon: PropTypes.node,
    trigger: PropTypes.node,
    mountNode: PropTypes.any /* DOM-element */
  };

  static defaultProps = {
    needDimmer: true,
    mountNode: document.body
  };

  /** Components **/
  static Header = Header;

  static Content = Content;

  static Actions = Actions;

  /** Properties **/
  refModal = createRef();

  shouldCloseOnEscape = true;

  shouldCloseOnDimmerClick = true;

  /** Methods **/
  onDimmerClick = event => {
    this.shouldCloseOnDimmerClick &&
      event.target === event.currentTarget &&
      this.close();
  };

  toggle = () => {
    this.props.isOpen ? this.close() : this.open();
  };

  open = () => {
    this.props.onOpen && this.props.onOpen();
  };

  close = () => {
    this.props.onClose && this.props.onClose();

    if(modalsStore.length === 1 && this.shouldCloseOnEscape) {
      document.body.removeEventListener('keydown', this.onKeyDown);
    }

    modalsStore.pop();
  };

  onEscapePress = () => {
    const lastElement = modalsStore[modalsStore.length - 1];
    if(lastElement && lastElement.shouldCloseOnEscape)
      lastElement.close();
  };

  onKeyDown = (event) => {
    const escapeKeyCode = 27;

    if(event.keyCode === escapeKeyCode) {
      this.onEscapePress();
    }
  };

  componentDidMount = () => {
    this.props.onMount && this.props.onMount();

    if(modalsStore.length === 0) {
      document.body.addEventListener('keydown', this.onKeyDown);
    }

    /** Find Modal.Actions **/
    React.Children.forEach(this.props.children, (child) => {

      if(child && child.props.isActions) {
        this.shouldCloseOnEscape = false;
        this.shouldCloseOnDimmerClick = false;
      }

    });

    modalsStore.push(this);
  };

  componentWillUnmount = () => {
    const index = modalsStore.indexOf(this);

    if(index > -1) {
      modalsStore.splice(index, 1);
    }

    this.props.onUnmount && this.props.onUnmount();
  };



  renderModal = () => {
    const {props} = this;

    const modal = (
      <div
        ref={this.refModal}
        className={classNames(props.className, style.modal, 'modal')}
        id={'Modal'}
      >
        {React.isValidElement(props.closeIcon) &&
          React.cloneElement(props.closeIcon, {
            onClick: () => {
              this.close();
              props.closeIcon.props.onClick && props.closeIcon.props.onClick();
            },
            className: classNames(
              props.closeIcon.props.className,
              style.closeIcon,
            ),
          })}
        {props.children}
      </div>
    );

    return (props.needDimmer) ? this.renderWithDimmer(modal) : {modal};
  };

  renderWithDimmer = component => {
    const {props} = this;

    return (
      <Dimmer
        active={this.props.isOpen}
        onMouseDown={this.onDimmerClick}
        className={classNames(props.dimmerClassName)}
        fixed={true}
      >
        {component}
      </Dimmer>
    );
  };

  render() {
    const {props} = this;

    return (
      <Fragment>
        {React.isValidElement(props.trigger) &&
          React.cloneElement(props.trigger, {
            onClick: event => {
              props.trigger.props.onClick && props.trigger.props.onClick(event);
              this.toggle();
            },
          })}
        {
          props.isOpen &&
            ReactDOM.createPortal(this.renderModal(), props.mountNode)
        }
      </Fragment>
    );
  }
}

export default Modal;
