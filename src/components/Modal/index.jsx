import React from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';
import style from './style.less';

class Modal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    footer: PropTypes.any,
  };

  static defaultProps = {
    visible: false,
    title: '弹窗',
    footer: null,
    onCancel: undefined,
    onOk: undefined,
  };

  componentDidUpdate() {
    const { visible } = this.props;
    const modal = this.modal;
    const mask = modal.previousElementSibling;
    if (visible) {
      modal.className = [style.modal, style.slipUp].join(' ');
      mask.className = [style.mask, style.show].join(' ');
    } else {
      if (modal.className.indexOf('slip') !== -1) {
        modal.className = [style.modal, style.slipBottom].join(' ');
        mask.className = [style.mask, style.hidden].join(' ');
      }
    }
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }

  };

  handleOk = () => {
    const { onOk } = this.props;
    if (onOk) {
      onOk();
    }
  };

  render() {
    const { title, footer, visible, children } = this.props;
    let footDom;
    if (!footer) {
      footDom = (
        <>
          <button onClick={this.handleCancel}>确认</button>
          <button onClick={this.handleOk}>取消</button>
        </>
      );
    } else {
      footDom = null;
    }
    return (
      <div className={style.contain}>
        <div className={style.mask}></div>
        <div className={style.modal} ref={(modal) => (this.modal = modal)}>
          <div className={style.modal_document}>
            <div className={style.header}>
              <span>{title}</span>
              <CloseOutlined className={style.confirm_btn} onClick={this.handleCancel} />
            </div>
            <div className={style.con}>{children}</div>
            <div className={style.footer}>{footDom}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
