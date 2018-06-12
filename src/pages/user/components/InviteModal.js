import { Component } from 'react';
import { Modal, Toast } from 'antd-mobile';
import styles from './less/InviteModal.less';

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

class InviteModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) {
      e.stopPropagation();
    }
    const { code } = this.props.inviteImage;
    if (code === 1) {
      this.setState({
        visible: true,
      });
    } else {
      Toast.fail('晕，获取失败了', 2);
    }
  }

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  }

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <div onClick={this.showModelHandler}>
          { children }
        </div>
        <Modal
          popup
          animationType="slide-up"
          visible={this.state.visible}
          onOk={this.hideModelHandler}
          onCancel={this.hideModelHandler}
          footer={[{
            text: '我知道了',
            onPress: () => { this.hideModelHandler(); } }]}
        >
          { this._renderImage() }
        </Modal>
      </div>
    );
  }

  _renderImage() {
    const { inviteImage } = this.props;
    if (inviteImage.code === 1) {
      return (
        <div className={styles['image-container']}>
          <div className={styles['image-wrapper']}>
            <img src={inviteImage.data.url} alt="" />
          </div>
          <div className={styles['image-tips']}>长按图片保存或分享</div>
        </div>
      );
    }
  }
}

export default InviteModal;
