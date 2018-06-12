import { Component } from 'react';
import { base64ToFile } from '../../../utils/util'
import { uploadImage } from '../../../services/oss';
import {
  ActivityIndicator,
  Toast,
  Button,
  Modal,
} from 'antd-mobile';
import withRouter from 'umi/withRouter';
import InviteModal from './InviteModal';

import styles from './less/Footer.less';

const wx = require('weixin-js-sdk');

// const alert = Modal.alert;

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modalVisible: false,
    };
  }

  componentDidMount() {
  }

  uploadHandler = async () => {
    const { code, data: dataToken } = this.props.uploadToken;

    if (code === 1) {
      wx.ready(() => {
        wx.chooseImage({
          sourceType: ['camera'],
          success: res => {
            const localIds = res.localIds;

            this.setState({
              loading: true
            });

            wx.getLocalImgData({
              localId: localIds[0],
              success: res => {
                let dataUrl = res.localData;
                if (window.__wxjs_is_wkwebview) {
                  dataUrl = dataUrl.replace('jgp', 'jpeg')
                } else {
                  dataUrl = 'data:image/jpeg;base64,' + dataUrl
                }

                const dataFile = base64ToFile(dataUrl);

                uploadImage(dataFile, dataToken)
                .then(res => {
                  this.setState({
                    loading: false
                  });
                  this.setState({
                    modalVisible: true,
                  });
                })
                .catch(err => {
                  this.setState({
                    loading: false
                  });
                  Toast.fail('抱歉，上传失败了', 2);
                });
              }
            });
          }
        });
      });
    } else {
      Toast.fail('抱歉，Token获取失败', 1);
    }
  }

  uploadHandler2 = async (dataUrl) => {
    const { code, data: dataToken } = this.props.uploadToken;

    if (code === 1) {
      const dataFile = base64ToFile(dataUrl);
      uploadImage(dataFile, dataToken)
      .then(res => {
        alert(res)
        this.setState({
          loading: false
        });
        this.setState({
          modalVisible: true,
        });
      })
      .catch(err => {
        alert(err)
        this.setState({
          loading: false
        });
        Toast.fail('抱歉，上传失败了', 2);
      });
    } else {
      Toast.fail('抱歉，Token获取失败', 1);
    }
  }

  onChange = (files, type, index) => {
    this.uploadHandler2(files[0].url);
  }

  onClose = () => {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    return (
      <div className={styles.footer}>
        <div className={styles.photo}>
          <div className={styles['photo-wrapper']}>
            <div className={styles['photo-inner']}>
              <Button
                className={styles['photo-btn']}
                activeClassName={styles['photo-btn-active']}
                onClick={this.uploadHandler}>
                <i className={`iconfont icon-paizhao ${styles.icon}`}></i>
                开始挖矿
              </Button>
            </div>

            <Modal
              visible={this.state.modalVisible}
              transparent
              maskClosable={false}
              footer={[{
                text: '继续挖矿',
                onPress: () => { this.onClose(); }
              }]}
              wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
              <div className={styles['modal-upload']}>
                <div className={styles.message}>
                  <p>上传成功</p>
                  <p>收益5分钟内到账</p>
                </div>
              </div>
            </Modal>

            <ActivityIndicator
              toast
              text="上传中..."
              animating={this.state.loading}
            />
          </div>
        </div>
        <div className={styles.action}>
          <InviteModal record={{}} inviteImage={this.props.inviteImage}>
            <Button
              type="primary"
            >
              <i className={`iconfont icon-share ${styles['icon-action']}`}></i>
              邀请好友一起挖
            </Button>
          </InviteModal>
        </div>
      </div>
    );
  }
}

export default withRouter(Footer);
